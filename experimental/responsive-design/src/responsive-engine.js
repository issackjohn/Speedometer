/**
 * Responsive Engine - Handles matchMedia API integration for performance testing
 */

class ResponsiveEngine {
    constructor() {
        this.breakpoints = {
            mobile: window.matchMedia('(max-width: 480px)'),
            tablet: window.matchMedia('(min-width: 481px) and (max-width: 768px)'),
            desktop: window.matchMedia('(min-width: 769px)'),
            portrait: window.matchMedia('(orientation: portrait)'),
            landscape: window.matchMedia('(orientation: landscape)')
        };
        
        this.currentBreakpoint = '';
        this.listeners = new Map();
        this.performanceData = {
            mediaQueryEvaluations: [],
            layoutRecalculations: [],
            styleApplications: []
        };
        
        this.init();
    }
    
    init() {
        this.setupMediaQueryListeners();
        this.updateViewportInfo();
        this.detectInitialBreakpoint();
    }
    
    setupMediaQueryListeners() {
        // Add listeners for each breakpoint
        Object.entries(this.breakpoints).forEach(([name, mediaQuery]) => {
            const listener = (e) => this.handleMediaQueryChange(name, e);
            
            // Store the listener for potential cleanup
            this.listeners.set(name, listener);
            
            // Add the listener
            if (mediaQuery.addListener) {
                mediaQuery.addListener(listener);
            } else {
                // Modern browsers use addEventListener
                mediaQuery.addEventListener('change', listener);
            }
        });
    }
    
    handleMediaQueryChange(breakpointName, event) {
        const startTime = performance.now();
        
        console.log(`Media query change detected: ${breakpointName}`, event.matches);
        
        if (event.matches && ['mobile', 'tablet', 'desktop'].includes(breakpointName)) {
            this.currentBreakpoint = breakpointName;
            this.updateViewportInfo();
            this.triggerLayoutChanges();
        }
        
        if (breakpointName === 'portrait' || breakpointName === 'landscape') {
            this.updateOrientation();
        }
        
        const endTime = performance.now();
        this.recordPerformanceMetric('mediaQueryEvaluation', endTime - startTime);
    }
    
    detectInitialBreakpoint() {
        const startTime = performance.now();
        
        if (this.breakpoints.mobile.matches) {
            this.currentBreakpoint = 'mobile';
        } else if (this.breakpoints.tablet.matches) {
            this.currentBreakpoint = 'tablet';
        } else if (this.breakpoints.desktop.matches) {
            this.currentBreakpoint = 'desktop';
        }
        
        const endTime = performance.now();
        this.recordPerformanceMetric('mediaQueryEvaluation', endTime - startTime);
    }
    
    updateViewportInfo() {
        const dimensionsEl = document.getElementById('dimensions');
        const breakpointEl = document.getElementById('breakpoint');
        
        if (dimensionsEl) {
            dimensionsEl.textContent = `${window.innerWidth} x ${window.innerHeight}`;
        }
        
        if (breakpointEl) {
            breakpointEl.textContent = this.currentBreakpoint;
        }
        
        this.updateOrientation();
    }
    
    updateOrientation() {
        const orientationEl = document.getElementById('device-orientation');
        if (orientationEl) {
            const orientation = this.breakpoints.portrait.matches ? 'Portrait' : 'Landscape';
            orientationEl.textContent = orientation;
        }
    }
    
    triggerLayoutChanges() {
        const startTime = performance.now();
        
        // Force a style recalculation by adding/removing classes
        const contentCards = document.querySelectorAll('.content-card');
        contentCards.forEach(card => {
            card.classList.add('layout-change');
            
            // Trigger a forced reflow
            card.offsetHeight;
            
            setTimeout(() => {
                card.classList.remove('layout-change');
            }, 300);
        });
        
        const endTime = performance.now();
        this.recordPerformanceMetric('layoutRecalculation', endTime - startTime);
        
        this.triggerStyleUpdates();
    }
    
    triggerStyleUpdates() {
        const startTime = performance.now();
        
        const infoCard = document.getElementById('viewport-status');
        if (infoCard) {
            infoCard.classList.add('style-update');
            
            setTimeout(() => {
                infoCard.classList.remove('style-update');
            }, 500);
        }
        
        const endTime = performance.now();
        this.recordPerformanceMetric('styleApplication', endTime - startTime);
    }
    
    recordPerformanceMetric(type, duration) {
        const timestamp = Date.now();
        
        switch (type) {
            case 'mediaQueryEvaluation':
                this.performanceData.mediaQueryEvaluations.push({ timestamp, duration });
                this.updateMetricDisplay('eval-time', duration);
                break;
            case 'layoutRecalculation':
                this.performanceData.layoutRecalculations.push({ timestamp, duration });
                this.updateMetricDisplay('layout-recalc-time', duration);
                break;
            case 'styleApplication':
                this.performanceData.styleApplications.push({ timestamp, duration });
                this.updateMetricDisplay('style-apply-time', duration);
                break;
        }
    }
    
    updateMetricDisplay(elementId, value) {
        const element = document.getElementById(elementId);
        if (element) {
            element.textContent = `${value.toFixed(2)}ms`;
        }
    }
    
    // Method to simulate different viewport sizes for testing
    simulateViewport(width, height) {
        // Note: This can't actually change the viewport, but we can test the media queries
        console.log(`Simulating viewport: ${width}x${height}`);
        
        // We can trigger the media query evaluation by checking current matches
        const startTime = performance.now();
        
        const mobile = window.matchMedia('(max-width: 480px)').matches;
        const tablet = window.matchMedia('(min-width: 481px) and (max-width: 768px)').matches;
        const desktop = window.matchMedia('(min-width: 769px)').matches;
        
        const endTime = performance.now();
        this.recordPerformanceMetric('mediaQueryEvaluation', endTime - startTime);
        
        console.log('Current breakpoint matches:', { mobile, tablet, desktop });
    }
    
    // Method to run comprehensive performance tests
    runPerformanceTest() {
        console.log('Running comprehensive performance test...');
        
        const iterations = 100;
        let totalTime = 0;
        
        for (let i = 0; i < iterations; i++) {
            const startTime = performance.now();
            
            // Test all media queries
            const mobileMatch = this.breakpoints.mobile.matches;
            const tabletMatch = this.breakpoints.tablet.matches;
            const desktopMatch = this.breakpoints.desktop.matches;
            const portraitMatch = this.breakpoints.portrait.matches;
            const landscapeMatch = this.breakpoints.landscape.matches;
            
            // Force a style calculation
            document.body.offsetHeight;
            
            const endTime = performance.now();
            totalTime += (endTime - startTime);
        }
        
        const averageTime = totalTime / iterations;
        console.log(`Average media query evaluation time over ${iterations} iterations: ${averageTime.toFixed(2)}ms`);
        
        this.recordPerformanceMetric('mediaQueryEvaluation', averageTime);
        
        // Trigger layout changes for testing
        this.triggerLayoutChanges();
        
        return {
            averageEvaluationTime: averageTime,
            iterations: iterations,
            totalTime: totalTime
        };
    }
    
    getPerformanceData() {
        return this.performanceData;
    }
    
    // Cleanup method
    destroy() {
        this.listeners.forEach((listener, name) => {
            const mediaQuery = this.breakpoints[name];
            if (mediaQuery.removeListener) {
                mediaQuery.removeListener(listener);
            } else {
                mediaQuery.removeEventListener('change', listener);
            }
        });
        this.listeners.clear();
    }
}