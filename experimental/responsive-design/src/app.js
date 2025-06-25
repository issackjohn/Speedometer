/**
 * Main Application - Responsive Design Workload with matchMedia API integration
 */

class ResponsiveDesignApp {
    constructor() {
        this.responsiveEngine = null;
        this.performanceMonitor = null;
        this.isInitialized = false;
        this.testInterval = null;
        
        this.init();
    }
    
    init() {
        if (this.isInitialized) return;
        
        console.log('Initializing Responsive Design Workload...');
        
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setupApp());
        } else {
            this.setupApp();
        }
    }
    
    setupApp() {
        try {
            // Initialize the responsive engine
            this.responsiveEngine = new ResponsiveEngine();
            
            // Initialize the performance monitor
            this.performanceMonitor = new PerformanceMonitor();
            
            // Setup event listeners
            this.setupEventListeners();
            
            // Setup resize handler
            this.setupResizeHandler();
            
            // Start continuous testing
            this.startContinuousTesting();
            
            this.isInitialized = true;
            console.log('Responsive Design Workload initialized successfully');
            
        } catch (error) {
            console.error('Failed to initialize app:', error);
        }
    }
    
    setupEventListeners() {
        // Simulate mobile view button
        const mobileBtn = document.getElementById('simulate-mobile');
        if (mobileBtn) {
            mobileBtn.addEventListener('click', () => this.simulateMobileView());
        }
        
        // Simulate tablet view button
        const tabletBtn = document.getElementById('simulate-tablet');
        if (tabletBtn) {
            tabletBtn.addEventListener('click', () => this.simulateTabletView());
        }
        
        // Simulate desktop view button
        const desktopBtn = document.getElementById('simulate-desktop');
        if (desktopBtn) {
            desktopBtn.addEventListener('click', () => this.simulateDesktopView());
        }
        
        // Run performance test button
        const testBtn = document.getElementById('run-performance-test');
        if (testBtn) {
            testBtn.addEventListener('click', () => this.runPerformanceTest());
        }
        
        // Add keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case '1':
                        e.preventDefault();
                        this.simulateMobileView();
                        break;
                    case '2':
                        e.preventDefault();
                        this.simulateTabletView();
                        break;
                    case '3':
                        e.preventDefault();
                        this.simulateDesktopView();
                        break;
                    case 't':
                        e.preventDefault();
                        this.runPerformanceTest();
                        break;
                }
            }
        });
    }
    
    setupResizeHandler() {
        let resizeTimeout;
        
        window.addEventListener('resize', () => {
            // Debounce resize events
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                this.handleResize();
            }, 100);
        });
    }
    
    handleResize() {
        console.log(`Window resized to: ${window.innerWidth}x${window.innerHeight}`);
        
        if (this.responsiveEngine) {
            this.responsiveEngine.updateViewportInfo();
            
            // Measure the performance of handling the resize
            const startTime = performance.now();
            
            // Force a style recalculation
            document.body.offsetHeight;
            
            const endTime = performance.now();
            this.responsiveEngine.recordPerformanceMetric('layoutRecalculation', endTime - startTime);
        }
    }
    
    simulateMobileView() {
        console.log('Simulating mobile view...');
        this.showMessage('Simulating mobile viewport (≤480px)', 'info');
        
        if (this.responsiveEngine) {
            this.responsiveEngine.simulateViewport(375, 667); // iPhone dimensions
        }
        
        this.runMediaQueryTest();
    }
    
    simulateTabletView() {
        console.log('Simulating tablet view...');
        this.showMessage('Simulating tablet viewport (481px-768px)', 'info');
        
        if (this.responsiveEngine) {
            this.responsiveEngine.simulateViewport(768, 1024); // iPad dimensions
        }
        
        this.runMediaQueryTest();
    }
    
    simulateDesktopView() {
        console.log('Simulating desktop view...');
        this.showMessage('Simulating desktop viewport (≥769px)', 'info');
        
        if (this.responsiveEngine) {
            this.responsiveEngine.simulateViewport(1920, 1080); // Common desktop dimensions
        }
        
        this.runMediaQueryTest();
    }
    
    runMediaQueryTest() {
        if (!this.performanceMonitor) return;
        
        const commonQueries = [
            '(max-width: 480px)',
            '(min-width: 481px) and (max-width: 768px)',
            '(min-width: 769px)',
            '(orientation: portrait)',
            '(orientation: landscape)'
        ];
        
        const results = this.performanceMonitor.measureMediaQueryPerformance(commonQueries);
        console.log('Media query test results:', results);
    }
    
    runPerformanceTest() {
        console.log('Running comprehensive performance test...');
        this.showMessage('Running performance test...', 'info');
        
        try {
            // Run tests from both engines
            const engineResults = this.responsiveEngine ? this.responsiveEngine.runPerformanceTest() : null;
            const monitorResults = this.performanceMonitor ? this.performanceMonitor.runComprehensiveTest() : null;
            
            // Combine results
            const combinedResults = {
                engine: engineResults,
                monitor: monitorResults,
                timestamp: new Date().toISOString(),
                viewport: {
                    width: window.innerWidth,
                    height: window.innerHeight
                }
            };
            
            console.log('Performance test completed:', combinedResults);
            this.showMessage('Performance test completed! Check console for details.', 'success');
            
            // Optional: Display summary in UI
            this.displayPerformanceSummary(combinedResults);
            
            return combinedResults;
            
        } catch (error) {
            console.error('Performance test failed:', error);
            this.showMessage('Performance test failed. Check console for details.', 'error');
        }
    }
    
    displayPerformanceSummary(results) {
        // Create a summary display (could be expanded)
        const summary = document.createElement('div');
        summary.className = 'performance-summary';
        summary.innerHTML = `
            <h3>Performance Test Summary</h3>
            <p>Test completed at: ${new Date(results.timestamp).toLocaleString()}</p>
            <p>Viewport: ${results.viewport.width}x${results.viewport.height}</p>
            ${results.engine ? `<p>Average evaluation time: ${results.engine.averageEvaluationTime.toFixed(2)}ms</p>` : ''}
        `;
        
        // Add to page temporarily
        document.body.appendChild(summary);
        setTimeout(() => {
            document.body.removeChild(summary);
        }, 5000);
    }
    
    startContinuousTesting() {
        // Run light performance tests periodically
        this.testInterval = setInterval(() => {
            this.runLightPerformanceTest();
        }, 5000); // Every 5 seconds
    }
    
    runLightPerformanceTest() {
        if (!this.responsiveEngine) return;
        
        // Run a lightweight test without heavy DOM manipulation
        const startTime = performance.now();
        
        // Test media queries
        const mobile = window.matchMedia('(max-width: 480px)').matches;
        const tablet = window.matchMedia('(min-width: 481px) and (max-width: 768px)').matches;
        const desktop = window.matchMedia('(min-width: 769px)').matches;
        
        const endTime = performance.now();
        
        this.responsiveEngine.recordPerformanceMetric('mediaQueryEvaluation', endTime - startTime);
    }
    
    showMessage(message, type = 'info') {
        // Create a temporary message display
        const messageEl = document.createElement('div');
        messageEl.className = `message message-${type}`;
        messageEl.textContent = message;
        messageEl.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'error' ? '#f44336' : type === 'success' ? '#4CAF50' : '#2196F3'};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10000;
            font-family: inherit;
            animation: slideIn 0.3s ease;
        `;
        
        document.body.appendChild(messageEl);
        
        setTimeout(() => {
            messageEl.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                if (messageEl.parentNode) {
                    document.body.removeChild(messageEl);
                }
            }, 300);
        }, 3000);
    }
    
    // Get performance data for external analysis
    getPerformanceData() {
        return {
            engine: this.responsiveEngine ? this.responsiveEngine.getPerformanceData() : null,
            monitor: this.performanceMonitor ? this.performanceMonitor.getPerformanceSummary() : null
        };
    }
    
    // Cleanup method
    destroy() {
        if (this.testInterval) {
            clearInterval(this.testInterval);
        }
        
        if (this.responsiveEngine) {
            this.responsiveEngine.destroy();
        }
        
        if (this.performanceMonitor) {
            this.performanceMonitor.stopMonitoring();
        }
        
        this.isInitialized = false;
        console.log('Responsive Design Workload destroyed');
    }
}

// CSS for message animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);

// Initialize the application when script loads
const app = new ResponsiveDesignApp();

// Make the app available globally for testing
window.ResponsiveDesignApp = app;