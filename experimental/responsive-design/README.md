# Responsive Design Workload

A comprehensive workload for testing responsive design performance using the `matchMedia` API in Speedometer.

## Overview

This workload measures the performance impact of responsive design scenarios that real websites encounter, including:

- Media query evaluation time
- Layout recalculation triggered by viewport changes
- Style application changes
- Cross-breakpoint performance testing

## Features

### MediaQuery API Integration

The workload uses the `matchMedia` API to test common responsive breakpoints:

- **Mobile**: `(max-width: 480px)`
- **Tablet**: `(min-width: 481px) and (max-width: 768px)`
- **Desktop**: `(min-width: 769px)`
- **Orientation**: `(orientation: portrait)` and `(orientation: landscape)`

### Performance Measurements

The workload tracks several key performance metrics:

1. **Media Query Evaluation Time**: Time taken to evaluate media queries
2. **Layout Recalculation Time**: Time for browser to recalculate layout after changes
3. **Style Application Time**: Time to apply new styles based on media query matches

### Test Scenarios

The workload includes several test scenarios:

- **Continuous Monitoring**: Light performance tests run every 5 seconds
- **Viewport Simulation**: Buttons to simulate different device viewports
- **Comprehensive Testing**: Detailed performance analysis across multiple scenarios
- **Real-time Updates**: Live viewport information and performance metrics

## Architecture

The workload consists of three main components:

### 1. ResponsiveEngine (`src/responsive-engine.js`)

Handles the core `matchMedia` API integration:
- Sets up media query listeners
- Detects breakpoint changes
- Measures media query evaluation performance
- Triggers layout and style changes

### 2. PerformanceMonitor (`src/performance-monitor.js`)

Advanced performance tracking using modern browser APIs:
- Performance Observer integration
- Layout shift detection
- Paint timing measurements
- Custom performance marks and measures

### 3. Main Application (`src/app.js`)

Coordinates the overall workload experience:
- User interface interactions
- Test orchestration
- Result display
- Continuous performance monitoring

## Usage

### Running the Workload

1. Open `index.html` in a web browser
2. Observe real-time viewport information and performance metrics
3. Use test buttons to simulate different scenarios:
   - "Simulate Mobile View" - Tests mobile breakpoint performance
   - "Simulate Tablet View" - Tests tablet breakpoint performance
   - "Simulate Desktop View" - Tests desktop breakpoint performance
   - "Run Performance Test" - Executes comprehensive performance analysis

### Keyboard Shortcuts

- `Ctrl/Cmd + 1`: Simulate mobile view
- `Ctrl/Cmd + 2`: Simulate tablet view
- `Ctrl/Cmd + 3`: Simulate desktop view
- `Ctrl/Cmd + T`: Run performance test

### Programmatic Access

The workload exposes a global `ResponsiveDesignApp` object for programmatic testing:

```javascript
// Get current performance data
const data = window.ResponsiveDesignApp.getPerformanceData();

// Run a custom performance test
const results = window.ResponsiveDesignApp.runPerformanceTest();

// Access the responsive engine directly
const engine = window.ResponsiveDesignApp.responsiveEngine;
```

## Performance Metrics

### Media Query Evaluation

Measures the time taken to evaluate different media queries:

```javascript
const mobile = window.matchMedia('(max-width: 480px)').matches;
const tablet = window.matchMedia('(min-width: 481px) and (max-width: 768px)').matches;
```

### Layout Recalculation

Tracks layout performance when responsive changes occur:

```javascript
// Force layout recalculation
element.offsetHeight;
```

### Style Application

Measures the time to apply responsive style changes:

```javascript
// Apply responsive styles
element.style.backgroundColor = 'new-color';
element.offsetHeight; // Force style recalculation
```

## Browser Compatibility

The workload is designed to work across modern browsers that support:

- `matchMedia` API (IE 10+, all modern browsers)
- `PerformanceObserver` API (Chrome 52+, Firefox 57+, Safari 11+)
- ES6 Classes (IE 11+, all modern browsers)

For browsers without `PerformanceObserver`, the workload gracefully degrades to basic timing measurements.

## Development

### File Structure

```
experimental/responsive-design/
├── index.html              # Main HTML file
├── package.json            # Project configuration
├── README.md              # This file
└── src/
    ├── styles.css         # Responsive CSS with media queries
    ├── responsive-engine.js # Core matchMedia integration
    ├── performance-monitor.js # Advanced performance tracking
    └── app.js             # Main application logic
```

### Testing

The workload includes built-in testing capabilities:

- Real-time performance monitoring
- Comprehensive test suites
- Cross-breakpoint validation
- Performance regression detection

### Extending the Workload

To add new test scenarios:

1. Add new media queries to `ResponsiveEngine.breakpoints`
2. Implement custom performance measurements in `PerformanceMonitor`
3. Add UI controls in `index.html` and wire them up in `app.js`

## Performance Considerations

The workload is designed to:

- Minimize performance overhead during testing
- Use efficient DOM queries and manipulations
- Implement proper cleanup for event listeners
- Provide accurate timing measurements

## Browser Testing Notes

Different browsers may show varying performance characteristics:

- **Chrome**: Excellent PerformanceObserver support
- **Firefox**: Good overall performance, some API differences
- **Safari**: Strong performance, may require vendor prefixes
- **Edge**: Modern versions have good compatibility

## Future Enhancements

Potential areas for expansion:

- CSS Grid and Flexbox responsive testing
- Custom CSS properties (CSS variables) performance
- Container queries when widely supported
- Advanced responsive image testing
- Touch/pointer media query testing