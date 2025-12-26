import { useEffect, useRef } from 'react';
import './TimelineSection.css';
import gsap from 'gsap';

const TimelineSection = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);

    // State management using refs to avoid re-renders during animation loop
    const state = useRef({
        currentX: 0,
        targetX: 0,
        maxScroll: 0,
        isIntersecting: false
    });

    useEffect(() => {
        const container = containerRef.current;
        const track = trackRef.current;
        const progressBar = progressBarRef.current;

        if (!container || !track || !progressBar) return;

        // Calculate dimensions
        const updateDimensions = () => {
            const trackWidth = track.scrollWidth;
            const containerWidth = window.innerWidth;
            // Total scrollable distance = Track Width - Container Width
            // If track is smaller than container, maxScroll is 0
            state.current.maxScroll = Math.max(0, trackWidth - containerWidth);
        };

        updateDimensions();
        window.addEventListener('resize', updateDimensions);

        // Wheel Event Handler - The Core Logic
        const handleWheel = (e) => {
            // If we are scrolling vertically (deltaY)
            if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {

                const delta = e.deltaY;
                const { targetX, maxScroll } = state.current;

                // Check boundaries to determine if we should lock scroll or let it pass
                const atStart = targetX <= 0;
                const atEnd = targetX >= maxScroll;

                // Condition 1: Scrolling down, but not at end -> Scroll Timeline, Prevent Page Scroll
                if (delta > 0 && !atEnd) {
                    e.preventDefault();
                    state.current.targetX = Math.min(maxScroll, targetX + delta);
                }
                // Condition 2: Scrolling up, but not at start -> Scroll Timeline, Prevent Page Scroll
                else if (delta < 0 && !atStart) {
                    e.preventDefault();
                    state.current.targetX = Math.max(0, targetX + delta);
                }
                // Condition 3: At boundaries -> Let page scroll naturally (Do nothing)
            }
        };

        // Attach non-passive event listener to allow preventDefault
        container.addEventListener('wheel', handleWheel, { passive: false });

        // Animation Loop
        let animationFrameId;

        const tick = () => {
            const { currentX, targetX, maxScroll } = state.current;

            // Linear interpolation for smooth inertia: current = current + (target - current) * factor
            const ease = 0.08;
            const diff = targetX - currentX;

            // Only update if noticeable difference
            if (Math.abs(diff) > 0.1) {
                state.current.currentX = currentX + diff * ease;
            } else {
                state.current.currentX = targetX;
            }

            // Apply transform
            // We translate LEFT, so negative X
            track.style.transform = `translateX(${-state.current.currentX}px)`;

            // Update Physics-based Bike Animation
            // Wheel circumference approx 2 * PI * r (r=13) ~ 81px
            // Rotation = distance / circumference * 360
            const rotation = (state.current.currentX / 81) * 360;

            const rearWheel = container.querySelector('#rear-wheel');
            const frontWheel = container.querySelector('#front-wheel');
            if (rearWheel) rearWheel.style.transformOrigin = '20px 45px';
            if (frontWheel) frontWheel.style.transformOrigin = '80px 45px';

            if (rearWheel) rearWheel.style.transform = `rotate(${rotation}deg)`;
            if (frontWheel) frontWheel.style.transform = `rotate(${rotation}deg)`;

            // Gentle Body Bounce based on distance (Sine wave)
            // Bounce every 100px
            const bounce = Math.sin(state.current.currentX / 20) * 1;
            const bikeBody = container.querySelector('#bike-body');
            if (bikeBody) {
                bikeBody.style.transformOrigin = 'bottom center';
                bikeBody.style.transform = `translateY(${bounce}px)`;
            }

            // Update Progress Bar
            const progress = maxScroll > 0 ? state.current.currentX / maxScroll : 0;
            progressBar.style.width = `${progress * 100}%`;

            // Update Active Nodes
            updateNodes(state.current.currentX);

            animationFrameId = requestAnimationFrame(tick);
        };

        const updateNodes = (scrollPos) => {
            const wrappers = track.querySelectorAll('.event-wrapper');
            const viewportWidth = window.innerWidth;
            // Dynamic bike position matching CSS (50% on mobile, 25% on desktop)
            const bikePositionPercent = viewportWidth < 768 ? 0.5 : 0.25;
            const bikeScreenX = viewportWidth * bikePositionPercent;

            wrappers.forEach(wrapper => {
                const node = wrapper.querySelector('.node');
                const card = wrapper.querySelector('.event-card');

                // Node's position relative to the START of the track
                const nodeOffsetLeft = wrapper.offsetLeft + (wrapper.offsetWidth / 2);

                // Node's screen position = Node Track Pos - Scroll Pos
                // (Since track moves left, we subtract scrollPos)
                const nodeScreenX = nodeOffsetLeft - scrollPos;

                const dist = Math.abs(nodeScreenX - bikeScreenX);

                if (dist < 100) {
                    node.classList.add('active');
                    card.classList.add('visible');
                } else {
                    // Optional Fade Out
                    // node.classList.remove('active');
                    // card.classList.remove('visible');
                }
            });
        };

        tick();

        return () => {
            window.removeEventListener('resize', updateDimensions);
            container.removeEventListener('wheel', handleWheel);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="timeline-section-container" ref={containerRef}>
            {/* Background FX */}
            <div className="bg-grain"></div>
            <div className="fog-layer"></div>

            {/* Headline */}
            <h2 className="timeline-header st-font">TIMELINE</h2>

            {/* Progress Bar */}
            <div className="progress-bar" id="progress-bar" ref={progressBarRef}></div>

            {/* Scroll Prompt */}
            <div className="scroll-prompt">Scroll to Ride</div>

            {/* The Bicycle (Fixed relative to Container) */}
            <div className="bicycle-container">
                <svg className="bike-svg" viewBox="0 0 100 60" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <g fill="#050505" stroke="#ff0033" strokeWidth="0.8">
                        {/* Wheels with Spokes for visibility */}
                        <g className="wheel" id="rear-wheel">
                            <circle cx="20" cy="45" r="13" stroke="white" strokeWidth="1" fill="none" />
                            {/* Spokes */}
                            <line x1="20" y1="32" x2="20" y2="58" stroke="#555" strokeWidth="0.5" />
                            <line x1="7" y1="45" x2="33" y2="45" stroke="#555" strokeWidth="0.5" />
                            <line x1="11" y1="36" x2="29" y2="54" stroke="#555" strokeWidth="0.5" />
                            <line x1="11" y1="54" x2="29" y2="36" stroke="#555" strokeWidth="0.5" />
                        </g>
                        <g className="wheel" id="front-wheel">
                            <circle cx="80" cy="45" r="13" stroke="white" strokeWidth="1" fill="none" />
                            {/* Spokes */}
                            <line x1="80" y1="32" x2="80" y2="58" stroke="#555" strokeWidth="0.5" />
                            <line x1="67" y1="45" x2="93" y2="45" stroke="#555" strokeWidth="0.5" />
                            <line x1="71" y1="36" x2="89" y2="54" stroke="#555" strokeWidth="0.5" />
                            <line x1="71" y1="54" x2="89" y2="36" stroke="#555" strokeWidth="0.5" />
                        </g>

                        {/* Body Group for Bounce */}
                        <g className="bike-body" id="bike-body">
                            {/* Frame */}
                            <path d="M20 45 L40 25 L75 25 L80 45 M40 25 L35 55 M75 25 L70 55" stroke="white" strokeWidth="2" fill="none" />
                            {/* Rider */}
                            <path d="M40 25 L45 10 L55 5 L65 15 L60 25 L70 30" stroke="none" fill="#000" />
                            <circle cx="55" cy="5" r="4.5" fill="#000" />
                        </g>
                    </g>
                </svg>
                {/* Headlight Beam */}
                <div style={{
                    position: 'absolute',
                    right: '-80px',
                    top: '10px',
                    width: '100px',
                    height: '30px',
                    background: 'linear-gradient(90deg, rgba(255,255,200,0.4), transparent)',
                    transform: 'rotate(15deg)',
                    clipPath: 'polygon(0 40%, 100% 0, 100% 100%, 0 60%)',
                    pointerEvents: 'none',
                    mixBlendMode: 'screen'
                }}></div>
            </div>

            {/* The Moving Track */}
            <div className="horizontal-track" id="track" ref={trackRef}>

                {/* The Road Line */}
                <div className="timeline-road"></div>

                {/* EVENTS */}

                {/* 1 */}
                <div className="event-wrapper" id="node-1">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Registration Starts</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">25 Dec 2025</p>
                        <p className="text-gray-400 text-sm mt-2">The gate opens.</p>
                    </div>
                </div>

                {/* 2 */}
                <div className="event-wrapper" id="node-2">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Registration Ends</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">15 Jan 2026</p>
                        <p className="text-gray-400 text-sm mt-2">The gate closes.</p>
                    </div>
                </div>

                {/* 3 */}
                <div className="event-wrapper" id="node-3">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Confirmation Sent</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">From 18 Jan 2026</p>
                        <p className="text-gray-400 text-sm mt-2">Watch your inbox.</p>
                    </div>
                </div>

                {/* 4 */}
                <div className="event-wrapper" id="node-4">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Inauguration</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">7 Feb 2026 • 9:30 AM</p>
                        <p className="text-gray-400 text-sm mt-2">It begins.</p>
                    </div>
                </div>

                {/* 5 */}
                <div className="event-wrapper" id="node-5">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Hackathon Begins</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">7 Feb 2026 • 12:00 PM</p>
                        <p className="text-gray-400 text-sm mt-2">Code or die trying.</p>
                    </div>
                </div>

                {/* 6 */}
                <div className="event-wrapper" id="node-6">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Hackathon Ends</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">8 Feb 2026 • 12:00 PM</p>
                        <p className="text-gray-400 text-sm mt-2">Systems down.</p>
                    </div>
                </div>

                {/* 7 */}
                <div className="event-wrapper" id="node-7">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Final Evaluation</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">8 Feb 2026 • 1:30 PM</p>
                        <p className="text-gray-400 text-sm mt-2">Judgment awaits.</p>
                    </div>
                </div>

                {/* 8 */}
                <div className="event-wrapper" id="node-8">
                    <div className="node"></div>
                    <div className="event-card">
                        <h3 className="st-font text-2xl text-red-500">Winners Announced</h3>
                        <p className="text-white text-xl font-bold mt-1 st-text-glow">8 Feb 2026 • 4:00 PM</p>
                        <p className="text-gray-400 text-sm mt-2">Legends are born.</p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default TimelineSection;
