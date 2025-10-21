#!/usr/bin/env node

/**
 * Visual Comparison Script for Maestro Test Screenshots
 *
 * This script:
 * 1. Finds all screenshot pairs (CoolPDF vs react-native-pdf)
 * 2. Uses ImageMagick to generate visual diffs
 * 3. Calculates difference metrics
 * 4. Generates an HTML report with side-by-side comparisons
 */

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Configuration
const SCREENSHOTS_DIR = '/tmp/maestro-screenshots';
const OUTPUT_DIR = path.join(__dirname, '..', 'visual-diff-results');
const REPORT_FILE = path.join(OUTPUT_DIR, 'visual-comparison-report.html');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Check if ImageMagick is installed
 */
function checkImageMagick() {
  try {
    execSync('which compare', { encoding: 'utf8' });
    console.log('✓ ImageMagick is installed');
    return true;
  } catch (error) {
    console.error('✗ ImageMagick is not installed');
    console.error('  Install with: brew install imagemagick');
    return false;
  }
}

/**
 * Find screenshot pairs in the screenshots directory
 */
function findScreenshotPairs() {
  if (!fs.existsSync(SCREENSHOTS_DIR)) {
    throw new Error(`Screenshots directory not found: ${SCREENSHOTS_DIR}`);
  }

  const files = fs.readdirSync(SCREENSHOTS_DIR);
  const screenshots = files.filter(f => f.endsWith('.png'));

  const pairs = [];
  const processed = new Set();

  screenshots.forEach(file => {
    if (processed.has(file)) return;

    if (file.includes('-coolpdf.png')) {
      const baseName = file.replace('-coolpdf.png', '');
      const rnpdfFile = `${baseName}-rnpdf.png`;

      if (screenshots.includes(rnpdfFile)) {
        pairs.push({
          name: baseName,
          coolpdf: path.join(SCREENSHOTS_DIR, file),
          rnpdf: path.join(SCREENSHOTS_DIR, rnpdfFile),
          diffOutput: path.join(OUTPUT_DIR, `${baseName}-diff.png`)
        });
        processed.add(file);
        processed.add(rnpdfFile);
      }
    }
  });

  return pairs;
}

/**
 * Compare two images using ImageMagick
 */
function compareImages(pair) {
  console.log(`Comparing: ${pair.name}`);

  try {
    // Use ImageMagick compare command
    // -metric AE counts the number of different pixels
    // -compose src outputs the difference image
    // Note: compare exits with code 1 when images differ, so we use try/catch to handle both cases
    let result;
    try {
      result = execSync(
        `compare -metric AE -compose src "${pair.coolpdf}" "${pair.rnpdf}" "${pair.diffOutput}" 2>&1`,
        { encoding: 'utf8' }
      );
    } catch (error) {
      // ImageMagick exits with code 1 when images differ, but still outputs the metric
      result = error.stdout || error.stderr || error.message;
    }

    const differentPixels = parseInt(result.trim().split(' ')[0]) || 0;

    // Get image dimensions to calculate percentage
    const identify = execSync(`identify -format "%w %h" "${pair.coolpdf}"`, { encoding: 'utf8' });
    const [width, height] = identify.trim().split(' ').map(Number);
    const totalPixels = width * height;
    const diffPercentage = ((differentPixels / totalPixels) * 100).toFixed(2);

    return {
      ...pair,
      differentPixels,
      totalPixels,
      diffPercentage: parseFloat(diffPercentage),
      status: differentPixels === 0 ? 'identical' : diffPercentage < 1 ? 'minor-diff' : 'significant-diff'
    };
  } catch (error) {
    console.error(`Error comparing ${pair.name}:`, error.message);
    return {
      ...pair,
      error: error.message,
      status: 'error'
    };
  }
}

/**
 * Generate HTML report
 */
function generateHTMLReport(comparisons) {
  const html = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Visual Comparison Report - CoolPDF vs react-native-pdf</title>
  <style>
    * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      background: #f5f5f5;
      padding: 20px;
    }

    .container {
      max-width: 1400px;
      margin: 0 auto;
      background: white;
      border-radius: 8px;
      padding: 30px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }

    h1 {
      color: #333;
      margin-bottom: 10px;
    }

    .summary {
      background: #f8f9fa;
      padding: 20px;
      border-radius: 6px;
      margin: 20px 0;
    }

    .summary-stats {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 15px;
      margin-top: 15px;
    }

    .stat {
      background: white;
      padding: 15px;
      border-radius: 4px;
      text-align: center;
    }

    .stat-value {
      font-size: 32px;
      font-weight: bold;
      color: #5856d6;
    }

    .stat-label {
      color: #666;
      font-size: 14px;
      margin-top: 5px;
    }

    .comparison {
      margin: 30px 0;
      padding: 20px;
      border: 1px solid #e0e0e0;
      border-radius: 6px;
    }

    .comparison-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 15px;
    }

    .comparison-name {
      font-size: 18px;
      font-weight: 600;
      color: #333;
    }

    .status-badge {
      padding: 6px 12px;
      border-radius: 4px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }

    .status-identical {
      background: #d4edda;
      color: #155724;
    }

    .status-minor-diff {
      background: #fff3cd;
      color: #856404;
    }

    .status-significant-diff {
      background: #f8d7da;
      color: #721c24;
    }

    .status-error {
      background: #f8d7da;
      color: #721c24;
    }

    .metrics {
      display: flex;
      gap: 20px;
      margin: 15px 0;
      font-size: 14px;
      color: #666;
    }

    .metric strong {
      color: #333;
    }

    .images-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 15px;
      margin-top: 15px;
    }

    .image-container {
      text-align: center;
    }

    .image-label {
      font-weight: 600;
      color: #555;
      margin-bottom: 8px;
      font-size: 14px;
    }

    .image-container img {
      width: 100%;
      border: 1px solid #ddd;
      border-radius: 4px;
      cursor: pointer;
      transition: transform 0.2s;
    }

    .image-container img:hover {
      transform: scale(1.02);
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    }

    .timestamp {
      color: #999;
      font-size: 14px;
      margin-top: 10px;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>📊 Visual Comparison Report</h1>
    <p class="timestamp">Generated: ${new Date().toLocaleString()}</p>

    <div class="summary">
      <h2>Summary</h2>
      <div class="summary-stats">
        <div class="stat">
          <div class="stat-value">${comparisons.length}</div>
          <div class="stat-label">Total Tests</div>
        </div>
        <div class="stat">
          <div class="stat-value">${comparisons.filter(c => c.status === 'identical').length}</div>
          <div class="stat-label">Identical</div>
        </div>
        <div class="stat">
          <div class="stat-value">${comparisons.filter(c => c.status === 'minor-diff').length}</div>
          <div class="stat-label">Minor Differences</div>
        </div>
        <div class="stat">
          <div class="stat-value">${comparisons.filter(c => c.status === 'significant-diff').length}</div>
          <div class="stat-label">Significant Differences</div>
        </div>
      </div>
    </div>

    ${comparisons.map(comp => `
      <div class="comparison">
        <div class="comparison-header">
          <h3 class="comparison-name">${comp.name}</h3>
          <span class="status-badge status-${comp.status}">
            ${comp.status === 'identical' ? '✓ Identical' :
              comp.status === 'minor-diff' ? '⚠ Minor Difference' :
              comp.status === 'significant-diff' ? '✗ Significant Difference' :
              '✗ Error'}
          </span>
        </div>

        ${comp.error ? `
          <p style="color: #721c24;">Error: ${comp.error}</p>
        ` : `
          <div class="metrics">
            <div class="metric">
              <strong>Different Pixels:</strong> ${comp.differentPixels.toLocaleString()}
            </div>
            <div class="metric">
              <strong>Difference:</strong> ${comp.diffPercentage}%
            </div>
            <div class="metric">
              <strong>Total Pixels:</strong> ${comp.totalPixels.toLocaleString()}
            </div>
          </div>

          <div class="images-grid">
            <div class="image-container">
              <div class="image-label">CoolPDF</div>
              <img src="${path.relative(OUTPUT_DIR, comp.coolpdf)}" alt="CoolPDF" onclick="window.open(this.src)">
            </div>
            <div class="image-container">
              <div class="image-label">react-native-pdf</div>
              <img src="${path.relative(OUTPUT_DIR, comp.rnpdf)}" alt="react-native-pdf" onclick="window.open(this.src)">
            </div>
            <div class="image-container">
              <div class="image-label">Difference</div>
              <img src="${path.basename(comp.diffOutput)}" alt="Difference" onclick="window.open(this.src)">
            </div>
          </div>
        `}
      </div>
    `).join('')}
  </div>
</body>
</html>
  `;

  fs.writeFileSync(REPORT_FILE, html);
  console.log(`\n✓ Report generated: ${REPORT_FILE}`);
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Visual Comparison Tool for CoolPDF vs react-native-pdf\n');

  // Check dependencies
  if (!checkImageMagick()) {
    process.exit(1);
  }

  // Find screenshot pairs
  const pairs = findScreenshotPairs();
  console.log(`✓ Found ${pairs.length} screenshot pair(s)\n`);

  if (pairs.length === 0) {
    console.log('No screenshot pairs found. Make sure your tests use takeScreenshot with -coolpdf and -rnpdf suffixes.');
    process.exit(0);
  }

  // Compare each pair
  const comparisons = pairs.map(compareImages);

  // Generate report
  generateHTMLReport(comparisons);

  // Print summary
  console.log('\n📊 Comparison Summary:');
  console.log(`   Identical: ${comparisons.filter(c => c.status === 'identical').length}`);
  console.log(`   Minor differences: ${comparisons.filter(c => c.status === 'minor-diff').length}`);
  console.log(`   Significant differences: ${comparisons.filter(c => c.status === 'significant-diff').length}`);
  console.log(`   Errors: ${comparisons.filter(c => c.status === 'error').length}`);

  // Open report
  console.log(`\n🌐 Opening report in browser...`);
  execSync(`open "${REPORT_FILE}"`);
}

// Run if called directly
if (require.main === module) {
  main();
}

module.exports = { findScreenshotPairs, compareImages, generateHTMLReport };