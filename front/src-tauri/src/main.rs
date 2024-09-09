// Prevents additional console window on Windows in release
#![cfg_attr(
    all(not(debug_assertions), target_os = "windows"),
    windows_subsystem = "windows"
)]

mod r#mod;

use r#mod::irelia::routes::{get_lobby_data, get_matchmaking_data, get_champ_select_data};

// Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
#[tauri::command]
fn greet(name: &str) -> String {
    format!("Hello, {}! You've been greeted from Rust!", name)
}

fn main() {
    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![greet,get_lobby_data, get_matchmaking_data, get_champ_select_data])
        .plugin(tauri_plugin_app::init())
        .plugin(tauri_plugin_os::init())
        .plugin(tauri_plugin_shell::init())
        .plugin(tauri_plugin_window::init())
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
