#!/usr/bin/env node

const fs = require("fs");
const path = require("path");
const readline = require("readline");

// Parse command line arguments
const args = process.argv.slice(2);
const getArg = (flag) => {
  const index = args.indexOf(flag);
  return index !== -1 ? args[index + 1] : null;
};

const VALID_CATEGORIES = ["basic", "navigation", "zoom"];

// Convert string to PascalCase
function toPascalCase(str) {
  return str
    .split(/[\s-_]+/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join("");
}

// Convert string to kebab-case
function toKebabCase(str) {
  return str
    .toLowerCase()
    .replace(/[\s_]+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

// Template for metadata file
function getMetadataTemplate(scenarioName, scenarioId, category) {
  const pascalName = toPascalCase(scenarioName);
  return `export const ${pascalName}Scenario = {
  id: "${scenarioId}",
  name: "${scenarioName}",
  description: "TODO: Add description",
  category: "${category}" as const,
  expectedBehavior: "TODO: Describe expected behavior",
};
`;
}

// Template for CoolPDF screen
function getCoolPdfScreenTemplate(scenarioName) {
  const pascalName = toPascalCase(scenarioName);
  return `import { useState } from "react";
import { CoolPdfView } from "cool-pdf";
import { View, StyleSheet } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { ${pascalName}Scenario } from "./${pascalName}";

export default function ${pascalName}CoolPdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="CoolPDF Implementation"
        name={${pascalName}Scenario.name}
        description={${pascalName}Scenario.description}
        backgroundColor="#5856d6"
      />

      <CoolPdfView
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
          // TODO: Add your props here
        }}
        onLoadComplete={(event) => {
          const { numberOfPages, path, dimensions, tableContents } =
            event.nativeEvent;
          addEvent("loadComplete", {
            numberOfPages,
            path,
            dimensions,
            tableContents,
          });
        }}
        style={styles.pdf}
      />

      <ScenarioEventLog events={events} accentColor="#5856d6" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pdf: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
});
`;
}

// Template for react-native-pdf screen
function getReactNativePdfScreenTemplate(scenarioName) {
  const pascalName = toPascalCase(scenarioName);
  return `import { useState } from "react";
import Pdf from "react-native-pdf";
import { View, StyleSheet } from "react-native";
import {
  ScenarioEventLog,
  ScenarioEvent,
} from "../../../components/ScenarioEventLog";
import { ScenarioHeader } from "../../../components/ScenarioHeader";
import { ${pascalName}Scenario } from "./${pascalName}";

export default function ${pascalName}ReactNativePdfScreen() {
  const [events, setEvents] = useState<ScenarioEvent[]>([]);

  const addEvent = (type: ScenarioEvent["type"], data: any) => {
    setEvents((prev) => [...prev, { timestamp: Date.now(), type, data }]);
  };

  return (
    <View style={styles.container}>
      <ScenarioHeader
        implementation="react-native-pdf Implementation"
        name={${pascalName}Scenario.name}
        description={${pascalName}Scenario.description}
        backgroundColor="#34c759"
      />

      <Pdf
        source={{
          uri: "https://craftinginterpreters.com/sample.pdf",
          // TODO: Add your props here
        }}
        onLoadComplete={(numberOfPages, path, dimensions, tableContents) => {
          addEvent("loadComplete", {
            numberOfPages,
            path,
            dimensions,
            tableContents,
          });
        }}
        style={styles.pdf}
        trustAllCerts={false}
      />

      <ScenarioEventLog events={events} accentColor="#34c759" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  pdf: {
    flex: 1,
    backgroundColor: "#fff",
    margin: 16,
    borderRadius: 8,
  },
});
`;
}

// Update scenarios/index.ts
function updateIndexFile(scenarioName, category) {
  const pascalName = toPascalCase(scenarioName);
  const indexPath = path.join(
    __dirname,
    "..",
    "example",
    "screens",
    "scenarios",
    "index.ts"
  );
  let content = fs.readFileSync(indexPath, "utf8");

  // Add metadata import
  const metadataImport = `import { ${pascalName}Scenario } from "./${category}/${pascalName}";`;
  const importSection = content.match(
    /\/\/ Import scenario metadata[\s\S]*?(?=\n\/\/|$)/
  )[0];
  const updatedImportSection = importSection + "\n" + metadataImport;
  content = content.replace(importSection, updatedImportSection);

  // Add to re-exports based on category
  const categoryExportMap = {
    basic: /export \{\s*BasicWithCacheScenario[\s\S]*?\};/,
    navigation:
      /export \{\s*HorizontalScrollingScenario[\s\S]*?\};/,
    zoom: /export \{ InitialZoomScenario[\s\S]*?\};/,
  };

  const exportMatch = content.match(categoryExportMap[category]);
  if (exportMatch) {
    const exportBlock = exportMatch[0];
    const updatedExportBlock = exportBlock.replace(
      /\};/,
      `,\n  ${pascalName}Scenario,\n};`
    );
    content = content.replace(exportBlock, updatedExportBlock);
  }

  // Add screen exports
  const screenExportComment = content.match(
    new RegExp(`// ${category.charAt(0).toUpperCase() + category.slice(1)} scenarios`)
  );
  if (screenExportComment) {
    const insertPosition = content.indexOf(screenExportComment[0]);
    const nextSectionMatch = content
      .slice(insertPosition)
      .match(/\n\/\/ /);
    const insertPoint = nextSectionMatch
      ? insertPosition + content.slice(insertPosition).indexOf(nextSectionMatch[0])
      : content.length;

    const newExports = `\nexport { default as ${pascalName}CoolPdfScreen } from "./${category}/${pascalName}CoolPdfScreen";
export { default as ${pascalName}ReactNativePdfScreen } from "./${category}/${pascalName}ReactNativePdfScreen";\n`;

    content =
      content.slice(0, insertPoint) + newExports + content.slice(insertPoint);
  }

  // Add to allScenarios array
  const allScenariosMatch = content.match(
    /export const allScenarios: ScenarioMetadata\[\] = \[[\s\S]*?\];/
  );
  if (allScenariosMatch) {
    const allScenariosBlock = allScenariosMatch[0];

    // Find the category section
    const categoryComment = `// ${category.charAt(0).toUpperCase() + category.slice(1)}`;
    const categoryIndex = allScenariosBlock.indexOf(categoryComment);

    if (categoryIndex !== -1) {
      // Find the next category comment or end of array
      const nextCategoryMatch = allScenariosBlock
        .slice(categoryIndex + categoryComment.length)
        .match(/\n  \/\/ /);

      const insertPoint = nextCategoryMatch
        ? categoryIndex + categoryComment.length + allScenariosBlock.slice(categoryIndex + categoryComment.length).indexOf(nextCategoryMatch[0])
        : allScenariosBlock.lastIndexOf("];");

      const newEntry = `  {
    ...${pascalName}Scenario,
    coolPdfScreen: "${pascalName}CoolPdf",
    reactNativePdfScreen: "${pascalName}ReactNativePdf",
  },\n`;

      const updatedBlock =
        allScenariosBlock.slice(0, insertPoint) +
        "\n" +
        newEntry +
        allScenariosBlock.slice(insertPoint);

      content = content.replace(allScenariosBlock, updatedBlock);
    }
  }

  fs.writeFileSync(indexPath, content);
  console.log(`✓ Updated ${indexPath}`);
}

// Update App.tsx
function updateAppFile(scenarioName, category) {
  const pascalName = toPascalCase(scenarioName);
  const appPath = path.join(__dirname, "..", "example", "App.tsx");
  let content = fs.readFileSync(appPath, "utf8");

  // Add screen imports
  const importMatch = content.match(/import \{[\s\S]*?\} from "\.\/screens\/scenarios";/);
  if (importMatch) {
    const importBlock = importMatch[0];
    const categoryComment = `  // ${category.charAt(0).toUpperCase() + category.slice(1)} scenarios`;

    if (importBlock.includes(categoryComment)) {
      // Find the last import in this category section
      const categoryIndex = importBlock.indexOf(categoryComment);
      const remainingBlock = importBlock.slice(categoryIndex + categoryComment.length);

      // Find the next category comment or the closing brace
      const nextCategoryMatch = remainingBlock.match(/\n  \/\/ /);
      const nextCategoryIndex = nextCategoryMatch ? remainingBlock.indexOf(nextCategoryMatch[0]) : remainingBlock.indexOf("\n} from");

      // Find the last comma before the next section
      const sectionToInsert = remainingBlock.slice(0, nextCategoryIndex);
      const lastCommaIndex = sectionToInsert.lastIndexOf(",");

      if (lastCommaIndex !== -1) {
        const insertPoint = categoryIndex + categoryComment.length + lastCommaIndex + 1;
        const newImports = `\n  ${pascalName}CoolPdfScreen,\n  ${pascalName}ReactNativePdfScreen,`;

        const updatedImportBlock =
          importBlock.slice(0, insertPoint) +
          newImports +
          importBlock.slice(insertPoint);

        content = content.replace(importBlock, updatedImportBlock);
      }
    }
  }

  // Add to RootStackParamList type
  const paramListMatch = content.match(/type RootStackParamList = \{[\s\S]*?\};/);
  if (paramListMatch) {
    const paramListBlock = paramListMatch[0];
    const categoryComment = `  // ${category.charAt(0).toUpperCase() + category.slice(1)} scenarios`;

    if (paramListBlock.includes(categoryComment)) {
      const categoryIndex = paramListBlock.indexOf(categoryComment);
      const nextCategoryMatch = paramListBlock.slice(categoryIndex + categoryComment.length).match(/\n  \/\/ /);

      const insertPoint = nextCategoryMatch
        ? categoryIndex + categoryComment.length + paramListBlock.slice(categoryIndex + categoryComment.length).indexOf(nextCategoryMatch[0])
        : paramListBlock.indexOf("};");

      const newTypes = `  ${pascalName}CoolPdf: undefined;
  ${pascalName}ReactNativePdf: undefined;\n`;

      const updatedParamListBlock =
        paramListBlock.slice(0, insertPoint) +
        "\n" +
        newTypes +
        paramListBlock.slice(insertPoint);

      content = content.replace(paramListBlock, updatedParamListBlock);
    }
  }

  // Add Stack.Screen components
  const categoryCommentInScreens = `          {/* ${category.charAt(0).toUpperCase() + category.slice(1)} scenarios */}`;
  if (content.includes(categoryCommentInScreens)) {
    const categoryIndex = content.indexOf(categoryCommentInScreens);
    const nextCategoryMatch = content.slice(categoryIndex + categoryCommentInScreens.length).match(/\n\s*\{\/\*/);

    const insertPoint = nextCategoryMatch
      ? categoryIndex + categoryCommentInScreens.length + content.slice(categoryIndex + categoryCommentInScreens.length).indexOf(nextCategoryMatch[0])
      : content.indexOf("</Stack.Navigator>");

    const newScreens = `          <Stack.Screen
            name="${pascalName}CoolPdf"
            component={${pascalName}CoolPdfScreen}
            options={{ title: "${scenarioName} (CoolPDF)" }}
          />
          <Stack.Screen
            name="${pascalName}ReactNativePdf"
            component={${pascalName}ReactNativePdfScreen}
            options={{ title: "${scenarioName} (RN-PDF)" }}
          />\n`;

    content =
      content.slice(0, insertPoint) +
      "\n" +
      newScreens +
      content.slice(insertPoint);
  }

  fs.writeFileSync(appPath, content);
  console.log(`✓ Updated ${appPath}`);
}

// Main function
async function main() {
  let scenarioName = getArg("--name");
  let category = getArg("--category");
  let scenarioId = getArg("--id");

  // Interactive prompts if needed
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  const question = (query) =>
    new Promise((resolve) => rl.question(query, resolve));

  if (!scenarioName) {
    scenarioName = await question("Scenario name (e.g., 'Pinch Zoom Enabled'): ");
  }

  if (!category) {
    category = await question(
      `Category (${VALID_CATEGORIES.join("/")}): `
    );
  }

  if (!VALID_CATEGORIES.includes(category)) {
    console.error(
      `Error: Invalid category. Must be one of: ${VALID_CATEGORIES.join(", ")}`
    );
    rl.close();
    process.exit(1);
  }

  if (!scenarioId) {
    scenarioId = toKebabCase(scenarioName);
    const useDefault = await question(
      `Scenario ID [${scenarioId}]: `
    );
    if (useDefault.trim()) {
      scenarioId = toKebabCase(useDefault);
    }
  }

  rl.close();

  const pascalName = toPascalCase(scenarioName);
  const categoryDir = path.join(
    __dirname,
    "..",
    "example",
    "screens",
    "scenarios",
    category
  );

  // Check if scenario already exists
  const metadataFile = path.join(categoryDir, `${pascalName}.ts`);
  if (fs.existsSync(metadataFile)) {
    console.error(`Error: Scenario ${pascalName} already exists!`);
    process.exit(1);
  }

  // Create directory if it doesn't exist
  if (!fs.existsSync(categoryDir)) {
    fs.mkdirSync(categoryDir, { recursive: true });
  }

  // Create metadata file
  fs.writeFileSync(metadataFile, getMetadataTemplate(scenarioName, scenarioId, category));
  console.log(`✓ Created ${metadataFile}`);

  // Create CoolPDF screen
  const coolPdfScreen = path.join(
    categoryDir,
    `${pascalName}CoolPdfScreen.tsx`
  );
  fs.writeFileSync(coolPdfScreen, getCoolPdfScreenTemplate(scenarioName));
  console.log(`✓ Created ${coolPdfScreen}`);

  // Create react-native-pdf screen
  const rnPdfScreen = path.join(
    categoryDir,
    `${pascalName}ReactNativePdfScreen.tsx`
  );
  fs.writeFileSync(rnPdfScreen, getReactNativePdfScreenTemplate(scenarioName));
  console.log(`✓ Created ${rnPdfScreen}`);

  // Update index.ts
  updateIndexFile(scenarioName, category);

  // Update App.tsx
  updateAppFile(scenarioName, category);

  console.log(`\n✅ Scenario "${scenarioName}" created successfully!`);
  console.log("\nNext steps:");
  console.log(`1. Edit the scenario metadata in ${pascalName}.ts`);
  console.log(`2. Add props to ${pascalName}CoolPdfScreen.tsx`);
  console.log(`3. Add props to ${pascalName}ReactNativePdfScreen.tsx`);
}

main().catch(console.error);
