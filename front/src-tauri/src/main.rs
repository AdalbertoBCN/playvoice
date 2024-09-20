// Prevents additional console window on Windows in release
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod r#mod;

use std::env;

use r#mod::irelia::routes::{get_lobby_data, get_matchmaking_data, get_champ_select_data};

// get on .env file the clerk key "VITE_CLERK_PUBLISHABLE_KEY"
#[tauri::command]
fn get_clerk_key() -> String {
    let clerk_key = env::var("VITE_CLERK_PUBLISHABLE_KEY").unwrap();
    clerk_key
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![get_clerk_key,get_lobby_data, get_matchmaking_data, get_champ_select_data])
        .plugin(tauri_plugin_app::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_window::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
