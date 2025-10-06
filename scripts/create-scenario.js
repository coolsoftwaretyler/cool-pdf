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

const VALID_CATEGORIES = ["loading", "events", "style", "password", "navigation", "zoom"];

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

  // Add metadata import - find the last import before the re-export section
  const metadataImport = `import { ${pascalName}Scenario } from "./${category}/${pascalName}";`;
  const reExportMatch = content.match(/\/\/ Re-export scenario metadata/);
  if (reExportMatch) {
    const insertPosition = content.indexOf(reExportMatch[0]);
    content = content.slice(0, insertPosition) + metadataImport + "\n" + content.slice(insertPosition);
  }

  // Add screen exports - insert before "// Types" section
  const typesMatch = content.match(/\/\/ Types/);
  if (typesMatch) {
    const insertPosition = content.indexOf(typesMatch[0]);
    const newExports = `export { default as ${pascalName}CoolPdfScreen } from "./${category}/${pascalName}CoolPdfScreen";\nexport { default as ${pascalName}ReactNativePdfScreen } from "./${category}/${pascalName}ReactNativePdfScreen";\n\n`;
    content = content.slice(0, insertPosition) + newExports + content.slice(insertPosition);
  }

  // Add to allScenarios array - append before the closing ];
  const allScenariosMatch = content.match(
    /export const allScenarios: ScenarioMetadata\[\] = \[[\s\S]*?\];/
  );
  if (allScenariosMatch) {
    const allScenariosBlock = allScenariosMatch[0];
    const closingIndex = allScenariosBlock.lastIndexOf("];");

    const newEntry = `  {
    ...${pascalName}Scenario,
    coolPdfScreen: "${pascalName}CoolPdf",
    reactNativePdfScreen: "${pascalName}ReactNativePdf",
  },
`;

    const updatedBlock =
      allScenariosBlock.slice(0, closingIndex) +
      newEntry +
      allScenariosBlock.slice(closingIndex);

    content = content.replace(allScenariosBlock, updatedBlock);
  }

  fs.writeFileSync(indexPath, content);
  console.log(`✓ Updated ${indexPath}`);
}

// Update App.tsx
function updateAppFile(scenarioName, category) {
  const pascalName = toPascalCase(scenarioName);
  const appPath = path.join(__dirname, "..", "example", "App.tsx");
  let content = fs.readFileSync(appPath, "utf8");

  // Add screen imports - append before the closing "} from"
  const importMatch = content.match(/import \{[\s\S]*?\} from "\.\/screens\/scenarios";/);
  if (importMatch) {
    const importBlock = importMatch[0];
    const closingBraceIndex = importBlock.lastIndexOf("} from");

    const newImports = `  ${pascalName}CoolPdfScreen,
  ${pascalName}ReactNativePdfScreen,
`;

    const updatedImportBlock =
      importBlock.slice(0, closingBraceIndex) +
      newImports +
      importBlock.slice(closingBraceIndex);

    content = content.replace(importBlock, updatedImportBlock);
  }

  // Add to RootStackParamList type - append before the closing "};
  const paramListMatch = content.match(/type RootStackParamList = \{[\s\S]*?\};/);
  if (paramListMatch) {
    const paramListBlock = paramListMatch[0];
    const closingBraceIndex = paramListBlock.lastIndexOf("};");

    const newTypes = `  ${pascalName}CoolPdf: undefined;
  ${pascalName}ReactNativePdf: undefined;
`;

    const updatedParamListBlock =
      paramListBlock.slice(0, closingBraceIndex) +
      newTypes +
      paramListBlock.slice(closingBraceIndex);

    content = content.replace(paramListBlock, updatedParamListBlock);
  }

  // Add Stack.Screen components - append before </Stack.Navigator>
  const navigatorCloseMatch = content.match(/<\/Stack\.Navigator>/);
  if (navigatorCloseMatch) {
    const insertPoint = content.indexOf("</Stack.Navigator>");

    const newScreens = `          <Stack.Screen
            name="${pascalName}CoolPdf"
            component={${pascalName}CoolPdfScreen}
            options={{ title: "${scenarioName} (CoolPDF)" }}
          />
          <Stack.Screen
            name="${pascalName}ReactNativePdf"
            component={${pascalName}ReactNativePdfScreen}
            options={{ title: "${scenarioName} (RN-PDF)" }}
          />
`;

    content =
      content.slice(0, insertPoint) +
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
