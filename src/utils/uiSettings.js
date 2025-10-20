// Settings for UI effects and preferences
const STORAGE_KEY = "mailbox-ui-preferences";

// Default settings
const defaultSettings = {
  darkTechnoEnabled: true, // Enable by default so you can show it off initially
  threeJsEnabled: true, // Enable Three.js effects by default
  cyberGridEnabled: false, // Cyber grid is disabled by default
  pureGridEnabled: false, // Pure grid is disabled by default
};

// Get current settings or set defaults
export function getUISettings() {
  try {
    const storedSettings = localStorage.getItem(STORAGE_KEY);
    return storedSettings
      ? { ...defaultSettings, ...JSON.parse(storedSettings) }
      : defaultSettings;
  } catch (error) {
    console.error("Error loading UI settings:", error);
    return defaultSettings;
  }
}

// Update a specific setting
export function updateUISetting(key, value) {
  try {
    const currentSettings = getUISettings();
    const newSettings = { ...currentSettings, [key]: value };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSettings));

    // Dispatch appropriate events based on the setting being updated
    if (key === "threeJsEnabled") {
      window.dispatchEvent(
        new CustomEvent("threeJsToggle", { detail: { enabled: value } })
      );
    } else if (key === "cyberGridEnabled") {
      window.dispatchEvent(
        new CustomEvent("cyberGridToggle", { detail: { enabled: value } })
      );
    } else if (key === "pureGridEnabled") {
      window.dispatchEvent(
        new CustomEvent("pureGridToggle", { detail: { enabled: value } })
      );
    }

    return newSettings;
  } catch (error) {
    console.error("Error saving UI settings:", error);
    return getUISettings();
  }
}

// Toggle dark techno effects
export function toggleDarkTechnoEffects() {
  const settings = getUISettings();
  return updateUISetting("darkTechnoEnabled", !settings.darkTechnoEnabled);
}

// Toggle Three.js effects
export function toggleThreeJsEffects(enabled) {
  return updateUISetting("threeJsEnabled", enabled);
}
