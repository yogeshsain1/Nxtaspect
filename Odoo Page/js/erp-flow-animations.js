// Register GSAP plugins
gsap.registerPlugin(ScrollTrigger);

function initERPFlowAnimations() {
    const flowSection = document.querySelector('.erp-flow');
    const flowHead = document.querySelector('.erp-flow-head');
    const flowSubheading = document.querySelector('.erp-flow-subheading');
    const flowSteps = document.querySelectorAll('.flow-step');
    const flowNodes = document.querySelectorAll('.flow-node');
    const flowCards = document.querySelectorAll('.flow-card');

    // Set gradient background with smoother transition
    gsap.set(flowSection, {
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
        backgroundSize: "400% 400%"
    });

    // Smoother gradient animation
    gsap.to(flowSection, {
        backgroundPosition: "100% 100%",
        duration: 30,
        repeat: -1,
        ease: "sine.inOut",
        yoyo: true
    });

    // Professional heading styling
    gsap.set(flowHead, {
        color: "#ffffff",
        fontSize: "2.5rem",
        fontWeight: "700",
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        textAlign: "center",
        marginBottom: "3rem",
        position: "relative",
        padding: "1.5rem 0"
    });

    // Elegant underline effect
    const underline = document.createElement('div');
    underline.style.position = 'absolute';
    underline.style.bottom = '0';
    underline.style.left = '50%';
    underline.style.width = '0';
    underline.style.height = '2px';
    underline.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
    underline.style.transform = 'translateX(-50%)';
    underline.style.transition = 'all 0.3s ease';
    flowHead.appendChild(underline);

    // Split text for heading with words
    const headSplit = new SplitText(flowHead, { type: "words,chars" });

    // Professional heading animation sequence
    const headTimeline = gsap.timeline({
        scrollTrigger: {
            trigger: flowHead,
            start: "top bottom-=100",
            toggleActions: "play none none reverse"
        }
    });

    // Refined heading animation
    headTimeline
        .from(headSplit.words, {
            duration: 1,
            y: 30,
            opacity: 0,
            stagger: {
                amount: 0.5,
                from: "start"
            },
            ease: "power3.out"
        })
        .from(headSplit.chars, {
            duration: 0.8,
            opacity: 0,
            scale: 0.8,
            stagger: {
                amount: 0.3,
                from: "random"
            },
            ease: "back.out(1.2)"
        }, "-=0.5")
        .to(underline, {
            duration: 1.2,
            width: "60%",
            ease: "power2.inOut"
        }, "-=0.8");

    // Subtle hover effect for heading
    flowHead.addEventListener('mouseenter', () => {
        gsap.to(underline, {
            duration: 0.4,
            width: "80%",
            backgroundColor: "rgba(255, 255, 255, 1)",
            ease: "power2.out"
        });
    });

    flowHead.addEventListener('mouseleave', () => {
        gsap.to(underline, {
            duration: 0.4,
            width: "60%",
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            ease: "power2.out"
        });
    });

    // Professional subheading animation
    const subheadingSplit = new SplitText(flowSubheading, { type: "words" });
    gsap.from(subheadingSplit.words, {
        scrollTrigger: {
            trigger: flowSubheading,
            start: "top bottom-=50",
            toggleActions: "play none none reverse"
        },
        duration: 0.8,
        y: 20,
        opacity: 0,
        stagger: {
            amount: 0.4,
            from: "start"
        },
        ease: "power2.out"
    });

    // Refined flow steps animation
    flowSteps.forEach((step, index) => {
        const direction = index % 2 === 0 ? -1 : 1;
        const node = step.querySelector('.flow-node');
        const card = step.querySelector('.flow-card');
        const title = card.querySelector('.flow-title');
        const desc = card.querySelector('.flow-desc');

        // Create timeline for each step
        const stepTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: step,
                start: "top bottom-=100",
                toggleActions: "play none none reverse"
            }
        });

        // Professional step animation sequence
        stepTimeline
            .from(step, {
                duration: 1,
                x: direction * 50,
                opacity: 0,
                ease: "power3.out"
            })
            .from(node, {
                duration: 0.6,
                scale: 0,
                opacity: 0,
                ease: "back.out(1.7)"
            }, "-=0.4")
            .from(card, {
                duration: 0.8,
                y: 30,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.3")
            .from(title, {
                duration: 0.5,
                y: 20,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.4")
            .from(desc, {
                duration: 0.5,
                y: 20,
                opacity: 0,
                ease: "power2.out"
            }, "-=0.3");

        // Professional hover effect for cards
        card.addEventListener('mouseenter', () => {
            gsap.timeline()
                .to(card, {
                    duration: 0.4,
                    scale: 1.02,
                    boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
                    ease: "power2.out"
                })
                .to(node, {
                    duration: 0.4,
                    scale: 1.1,
                    backgroundColor: "#c82333",
                    ease: "power2.out"
                }, "-=0.4");
        });

        card.addEventListener('mouseleave', () => {
            gsap.timeline()
                .to(card, {
                    duration: 0.4,
                    scale: 1,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    ease: "power2.out"
                })
                .to(node, {
                    duration: 0.4,
                    scale: 1,
                    backgroundColor: "#222",
                    ease: "power2.out"
                }, "-=0.4");
        });

        // Professional click animation for nodes
        node.addEventListener('click', () => {
            gsap.timeline()
                .to(node, {
                    duration: 0.2,
                    scale: 0.9,
                    ease: "power2.in"
                })
                .to(node, {
                    duration: 0.4,
                    scale: 1.1,
                    backgroundColor: "#c82333",
                    ease: "elastic.out(1, 0.5)"
                })
                .to(node, {
                    duration: 0.3,
                    scale: 1,
                    backgroundColor: "#222",
                    ease: "power2.out"
                });
        });
    });

    // Professional connecting lines animation
    const createConnectingLines = () => {
        const container = document.querySelector('.flow-container');
        const steps = container.querySelectorAll('.flow-step');
        
        const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
        svg.setAttribute("class", "flow-lines");
        svg.style.position = "absolute";
        svg.style.top = "0";
        svg.style.left = "0";
        svg.style.width = "100%";
        svg.style.height = "100%";
        svg.style.pointerEvents = "none";
        container.appendChild(svg);

        steps.forEach((step, i) => {
            if (i < steps.length - 1) {
                const line = document.createElementNS("http://www.w3.org/2000/svg", "path");
                const startNode = step.querySelector('.flow-node');
                const endNode = steps[i + 1].querySelector('.flow-node');
                
                const startRect = startNode.getBoundingClientRect();
                const endRect = endNode.getBoundingClientRect();
                const containerRect = container.getBoundingClientRect();

                const startX = startRect.right - containerRect.left;
                const startY = startRect.top + startRect.height/2 - containerRect.top;
                const endX = endRect.left - containerRect.left;
                const endY = endRect.top + endRect.height/2 - containerRect.top;

                // Smoother curve for the path
                const controlPoint1X = startX + (endX - startX) * 0.5;
                const controlPoint2X = startX + (endX - startX) * 0.5;
                const path = `M ${startX} ${startY} C ${controlPoint1X} ${startY}, ${controlPoint2X} ${endY}, ${endX} ${endY}`;
                
                line.setAttribute("d", path);
                line.setAttribute("stroke", "rgba(200, 35, 51, 0.3)");
                line.setAttribute("stroke-width", "2");
                line.setAttribute("fill", "none");
                line.setAttribute("stroke-dasharray", "1000");
                line.setAttribute("stroke-dashoffset", "1000");
                
                svg.appendChild(line);

                // Smoother line drawing animation
                gsap.to(line, {
                    scrollTrigger: {
                        trigger: step,
                        start: "top bottom-=100",
                        toggleActions: "play none none reverse"
                    },
                    duration: 2,
                    strokeDashoffset: 0,
                    ease: "power2.inOut"
                });
            }
        });
    };

    // Create connecting lines after a short delay
    setTimeout(createConnectingLines, 100);

    // Cleanup function
    return () => {
        headSplit.revert();
        subheadingSplit.revert();
    };
}

// Initialize animations when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    const checkFlow = setInterval(() => {
        if (document.querySelector('.erp-flow')) {
            clearInterval(checkFlow);
            initERPFlowAnimations();
        }
    }, 100);
}); 