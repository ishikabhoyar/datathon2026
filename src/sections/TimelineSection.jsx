import { useRef } from 'react';
import './TimelineSection.css';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

const TimelineSection = () => {
    const containerRef = useRef(null);
    const trackRef = useRef(null);
    const progressBarRef = useRef(null);

    useGSAP(() => {
        const track = trackRef.current;
        const container = containerRef.current;
        const progressBar = progressBarRef.current;

        // Calculate scroll amount
        const getScrollAmount = () => {
            const trackWidth = track.scrollWidth;
            const containerWidth = window.innerWidth;
            return Math.max(0, trackWidth - containerWidth);
        };

        const scrollAmount = getScrollAmount();

        // --- Main Horizontal Scroll Tween ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: container,
                start: "top top",
                end: "+=2500", // Virtual scroll distance
                pin: true,
                scrub: 1,
                invalidateOnRefresh: true, // Recalculate on resize
                onUpdate: (self) => {
                    // --- Update Progress Bar ---
                    if (progressBar) {
                        progressBar.style.width = `${self.progress * 100}%`;
                    }

                    // --- Update Bike Animation ---
                    const currentX = self.progress * scrollAmount;

                    // Wheel Rotation
                    // Circumference ~ 81px
                    const rotation = (currentX / 81) * 360;

                    const rearWheel = container.querySelector('#rear-wheel');
                    const frontWheel = container.querySelector('#front-wheel');

                    if (rearWheel) {
                        rearWheel.style.transformOrigin = '20px 45px';
                        rearWheel.style.transform = `rotate(${rotation}deg)`;
                    }
                    if (frontWheel) {
                        frontWheel.style.transformOrigin = '80px 45px';
                        frontWheel.style.transform = `rotate(${rotation}deg)`;
                    }

                    // Body Bounce (Sine wave)
                    const bounce = Math.sin(currentX / 20) * 1;
                    const bikeBody = container.querySelector('#bike-body');
                    if (bikeBody) {
                        bikeBody.style.transformOrigin = 'bottom center';
                        bikeBody.style.transform = `translateY(${bounce}px)`;
                    }

                    // --- Update Active Nodes (Visibility) ---
                    updateNodes(currentX);
                }
            }
        });

        // The horizontal move
        tl.to(track, {
            x: () => -getScrollAmount(), // Functional value for responsiveness
            ease: "none",
            duration: 1
        });

        // --- Helper: Update Nodes ---
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
                const nodeScreenX = nodeOffsetLeft - scrollPos;

                const dist = Math.abs(nodeScreenX - bikeScreenX);

                if (dist < 100) {
                    node.classList.add('active');
                    card.classList.add('visible');
                }
            });
        };

    }, { scope: containerRef }); // Scope to container

    return (
        <div className="timeline-section-container" ref={containerRef} id="timeline">
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
