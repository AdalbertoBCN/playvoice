use irelia::{rest::LcuClient, RequestClient, Error};
use serde_json::Value;

use super::types::{LobbyRoot, MatchRoot, ChampSelectRoot};

// Função para obter dados do matchmaking
#[tauri::command]
pub async fn get_matchmaking_data() -> Option<MatchRoot> {
    let request_client = RequestClient::new();
    let lcu_client = LcuClient::new(false).unwrap();

    let json: Result<Option<Value>, Error> = lcu_client.get("/lol-matchmaking/v1/search", &request_client).await;

    match json {
        Ok(Some(value)) => {
            // Tenta desserializar para `MatchRoot`
            match serde_json::from_value(value) {
                Ok(match_data) => Some(match_data),
                Err(_) => None,
            }
        }
        _ => None, // Retorna `None` em caso de erro ou ausência de dados
    }
}

// Função para obter dados do lobby
#[tauri::command]
pub async fn get_lobby_data() -> Option<LobbyRoot> {
    let request_client = RequestClient::new();
    let lcu_client = LcuClient::new(false).unwrap();

    let json: Result<Option<Value>, Error> = lcu_client.get("/lol-lobby/v2/lobby", &request_client).await;

    match json {
        Ok(Some(value)) => {
            // Tenta desserializar para `LobbyRoot`
            match serde_json::from_value(value) {
                Ok(lobby_data) => Some(lobby_data),
                Err(_) => None,
            }
        }
        _ => None, // Retorna `None` em caso de erro ou ausência de dados
    }
}

// Função para obter dados da seleção route: /lol-champ-select/v1/session
#[tauri::command]
pub async fn get_champ_select_data() -> Option<ChampSelectRoot> {
    let request_client = RequestClient::new();
    let lcu_client = LcuClient::new(false).unwrap();

    let json: Result<Option<Value>, Error> = lcu_client.get("/lol-champ-select/v1/session", &request_client).await;

    match json {
        Ok(Some(value)) => {
            // Tenta desserializar para `ChampSelectRoot`
            match serde_json::from_value(value) {
                Ok(champ_select_data) => Some(champ_select_data),
                Err(_) => None,
            }
        }
        _ => None, // Retorna `None` em caso de erro ou ausência de dados
    }
}