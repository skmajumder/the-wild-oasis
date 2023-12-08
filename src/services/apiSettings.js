import supabase from "./supabase";

export async function getSettings() {
  const { data: settings, error: settingsError } = await supabase
    .from("settings")
    .select("*")
    .single();

  if (settingsError) {
    console.error(settingsError);
    throw new Error("Settings could not be loaded");
  }

  return settings;
}

// We expect a newSetting object that looks like {setting: newValue}
export async function updateSetting(newSetting) {
  const { data, error: updateError } = await supabase
    .from("settings")
    .update(newSetting)
    // * there is only ONE row of settings, and it has the ID=1, and so this is the updated one
    .eq("id", 1)
    .single();

  if (updateError) {
    console.error(updateError);
    throw new Error("Settings could not be updated");
  }
  return data;
}
