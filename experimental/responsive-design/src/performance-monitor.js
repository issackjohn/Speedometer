/**
 * Performance Monitor - Advanced performance tracking for responsive design scenarios
 */

class PerformanceMonitor {
    constructor() {
        this.measurements = [];
        this.observers = {};
        this.isMonitoring = false;
        
        this.init();
    }
    
    init() {
        this.setupPerformanceObservers();
        this.startMonitoring();
    }
    
    setupPerformanceObservers() {
        // Performance Observer for paint timing
        if ('PerformanceObserver' in window) {
            try {
                // Layout shift observer
                this.observers.layoutShift = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.entryType === 'layout-shift') {
                            this.recordMeasurement('layout-shift', {
                                value: entry.value,
                                startTime: entry.startTime,
                                hadRecentInput: entry.hadRecentInput
                            });
                        }
                    }
                });
                this.observers.layoutShift.observe({ entryTypes: ['layout-shift'] });
                
                // Paint observer
                this.observers.paint = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        this.recordMeasurement('paint', {
                            name: entry.name,
                            startTime: entry.startTime,
                            duration: entry.duration
                        });
                    }
                });
                this.observers.paint.observe({ entryTypes: ['paint'] });
                
                // Measure observer for custom measurements
                this.observers.measure = new PerformanceObserver((list) => {
                    for (const entry of list.getEntries()) {
                        if (entry.name.startsWith('responsive-')) {
                            this.recordMeasurement('custom-measure', {
                                name: entry.name,
                                startTime: entry.startTime,
                                duration: entry.duration
                            });
                        }
                    }
                });
                this.observers.measure.observe({ entryTypes: ['measure'] });
                
            } catch (e) {
                console.warn('Some performance observers are not supported:', e);
            }
        }
    }
    
    startMonitoring() {
        this.isMonitoring = true;
        console.log('Performance monitoring started');
    }
    
    stopMonitoring() {
        this.isMonitoring = false;
        Object.values(this.observers).forEach(observer => {
            if (observer && observer.disconnect) {
                observer.disconnect();
            }
        });
        console.log('Performance monitoring stopped');
    }
    
    recordMeasurement(type, data) {
        if (!this.isMonitoring) return;
        
        const measurement = {
            type,
            timestamp: performance.now(),
            data,
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            },
            userAgent: navigator.userAgent
        };
        
        this.measurements.push(measurement);
        
        // Keep only last 1000 measurements to prevent memory issues
        if (this.measurements.length > 1000) {
            this.measurements = this.measurements.slice(-1000);
        }
    }
    
    // Measure the time taken for media query evaluations
    measureMediaQueryPerformance(queries) {
        const markName = `responsive-media-query-start-${Date.now()}`;
        performance.mark(markName);
        
        const results = {};
        const startTime = performance.now();
        
        queries.forEach(query => {
            const queryStartTime = performance.now();
            const mediaQuery = window.matchMedia(query);
            const result = mediaQuery.matches;
            const queryEndTime = performance.now();
            
            results[query] = {
                matches: result,
                evaluationTime: queryEndTime - queryStartTime
            };
        });
        
        const endTime = performance.now();
        const totalTime = endTime - startTime;
        
        const measureName = `responsive-media-query-evaluation-${Date.now()}`;
        performance.mark(`${markName}-end`);
        performance.measure(measureName, markName, `${markName}-end`);
        
        this.recordMeasurement('media-query-batch', {
            queries: results,
            totalTime,
            queryCount: queries.length
        });
        
        return results;
    }
    
    // Measure layout recalculation performance
    measureLayoutRecalculation(callback) {
        const markName = `responsive-layout-start-${Date.now()}`;
        performance.mark(markName);
        
        const startTime = performance.now();
        
        // Force layout before the callback
        document.body.offsetHeight;
        
        if (callback && typeof callback === 'function') {
            callback();
        }
        
        // Force layout after the callback to measure recalculation
        document.body.offsetHeight;
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const measureName = `responsive-layout-recalc-${Date.now()}`;
        performance.mark(`${markName}-end`);
        performance.measure(measureName, markName, `${markName}-end`);
        
        this.recordMeasurement('layout-recalculation', {
            duration,
            forced: true
        });
        
        return duration;
    }
    
    // Measure style application performance
    measureStyleApplication(element, styles) {
        const markName = `responsive-style-start-${Date.now()}`;
        performance.mark(markName);
        
        const startTime = performance.now();
        
        if (element && styles) {
            Object.assign(element.style, styles);
            
            // Force style recalculation
            element.offsetHeight;
        }
        
        const endTime = performance.now();
        const duration = endTime - startTime;
        
        const measureName = `responsive-style-application-${Date.now()}`;
        performance.mark(`${markName}-end`);
        performance.measure(measureName, markName, `${markName}-end`);
        
        this.recordMeasurement('style-application', {
            duration,
            stylesApplied: Object.keys(styles || {}).length
        });
        
        return duration;
    }
    
    // Run a comprehensive performance test
    runComprehensiveTest() {
        console.log('Running comprehensive responsive performance test...');
        
        const testResults = {
            startTime: performance.now(),
            mediaQueries: {},
            layoutTests: [],
            styleTests: [],
            endTime: null
        };
        
        // Test common media queries
        const commonQueries = [
            '(max-width: 480px)',
            '(min-width: 481px) and (max-width: 768px)',
            '(min-width: 769px)',
            '(orientation: portrait)',
            '(orientation: landscape)',
            '(prefers-color-scheme: dark)',
            '(prefers-reduced-motion: reduce)',
            '(hover: hover)',
            '(pointer: coarse)'
        ];
        
        testResults.mediaQueries = this.measureMediaQueryPerformance(commonQueries);
        
        // Test layout recalculations
        for (let i = 0; i < 5; i++) {
            const layoutTime = this.measureLayoutRecalculation(() => {
                // Trigger layout changes
                const elements = document.querySelectorAll('.content-card');
                elements.forEach(el => {
                    el.style.height = `${200 + Math.random() * 50}px`;
                });
            });
            testResults.layoutTests.push(layoutTime);
        }
        
        // Test style applications
        const testElements = document.querySelectorAll('.metric-card');
        testElements.forEach((element, index) => {
            const styleTime = this.measureStyleApplication(element, {
                backgroundColor: `hsl(${index * 60}, 70%, 90%)`,
                transform: `scale(${1 + Math.random() * 0.1})`,
                borderRadius: `${5 + Math.random() * 10}px`
            });
            testResults.styleTests.push(styleTime);
        });
        
        testResults.endTime = performance.now();
        testResults.totalDuration = testResults.endTime - testResults.startTime;
        
        console.log('Comprehensive test completed:', testResults);
        
        // Display results
        this.displayTestResults(testResults);
        
        return testResults;
    }
    
    displayTestResults(results) {
        const avgLayoutTime = results.layoutTests.reduce((a, b) => a + b, 0) / results.layoutTests.length;
        const avgStyleTime = results.styleTests.reduce((a, b) => a + b, 0) / results.styleTests.length;
        
        // Update UI with results
        const evalTimeEl = document.getElementById('eval-time');
        const layoutTimeEl = document.getElementById('layout-recalc-time');
        const styleTimeEl = document.getElementById('style-apply-time');
        
        if (evalTimeEl) {
            const avgQueryTime = Object.values(results.mediaQueries)
                .reduce((sum, query) => sum + query.evaluationTime, 0) / Object.keys(results.mediaQueries).length;
            evalTimeEl.textContent = `${avgQueryTime.toFixed(2)}ms`;
        }
        
        if (layoutTimeEl) {
            layoutTimeEl.textContent = `${avgLayoutTime.toFixed(2)}ms`;
        }
        
        if (styleTimeEl) {
            styleTimeEl.textContent = `${avgStyleTime.toFixed(2)}ms`;
        }
    }
    
    // Get performance summary
    getPerformanceSummary() {
        const summary = {
            totalMeasurements: this.measurements.length,
            byType: {},
            averages: {},
            recent: this.measurements.slice(-10)
        };
        
        // Group measurements by type
        this.measurements.forEach(measurement => {
            if (!summary.byType[measurement.type]) {
                summary.byType[measurement.type] = [];
            }
            summary.byType[measurement.type].push(measurement);
        });
        
        // Calculate averages
        Object.keys(summary.byType).forEach(type => {
            const measurements = summary.byType[type];
            if (measurements.length > 0) {
                const durations = measurements
                    .map(m => m.data.duration || m.data.totalTime || 0)
                    .filter(d => d > 0);
                
                if (durations.length > 0) {
                    summary.averages[type] = durations.reduce((a, b) => a + b, 0) / durations.length;
                }
            }
        });
        
        return summary;
    }
    
    // Export measurements for analysis
    exportMeasurements() {
        return {
            measurements: this.measurements,
            summary: this.getPerformanceSummary(),
            exportTime: new Date().toISOString(),
            viewport: {
                width: window.innerWidth,
                height: window.innerHeight
            }
        };
    }
}