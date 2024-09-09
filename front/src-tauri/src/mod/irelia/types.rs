// src/mod/irelia/types.rs

use serde::{Deserialize, Serialize};
use serde_json::Value;

// Estruturas de matchmaking
#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MatchRoot {
    pub dodge_data: DodgeData,
    pub errors: Vec<Value>,
    pub estimated_queue_time: f64,
    pub is_currently_in_queue: bool,
    pub lobby_id: String,
    pub low_priority_data: LowPriorityData,
    pub queue_id: i64,
    pub ready_check: ReadyCheck,
    pub search_state: String,
    pub time_in_queue: f64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct DodgeData {
    pub dodger_id: i64,
    pub state: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LowPriorityData {
    pub busted_leaver_access_token: String,
    pub penalized_summoner_ids: Vec<Value>,
    pub penalty_time: f64,
    pub penalty_time_remaining: f64,
    pub reason: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ReadyCheck {
    pub decliner_ids: Vec<Value>,
    pub dodge_warning: String,
    pub player_response: String,
    pub state: String,
    pub suppress_ux: bool,
    pub timer: f64,
}

// Lobby

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Member {
    pub allowed_change_activity: bool,
    pub allowed_invite_others: bool,
    pub allowed_kick_others: bool,
    pub allowed_start_activity: bool,
    pub allowed_toggle_invite: bool,
    pub auto_fill_eligible: bool,
    pub auto_fill_protected_for_promos: bool,
    pub auto_fill_protected_for_remedy: bool,
    pub auto_fill_protected_for_soloing: bool,
    pub auto_fill_protected_for_streaking: bool,
    pub bot_champion_id: i64,
    pub bot_difficulty: String,
    pub bot_id: String,
    pub bot_position: String,
    pub bot_uuid: String,
    pub first_position_preference: String,
    pub intra_subteam_position: Value,
    pub is_bot: bool,
    pub is_leader: bool,
    pub is_spectator: bool,
    pub player_slots: Vec<Value>,
    pub puuid: String,
    pub quickplay_player_state: Value,
    pub ready: bool,
    pub second_position_preference: String,
    pub show_ghosted_banner: bool,
    pub strawberry_map_id: Value,
    pub subteam_index: Value,
    pub summoner_icon_id: i64,
    pub summoner_id: i64,
    pub summoner_internal_name: String,
    pub summoner_level: i64,
    pub summoner_name: String,
    pub team_id: i64,
    #[serde(rename = "tftNPEQueueBypass")]
    pub tft_npequeue_bypass: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LobbyRoot {
    pub can_start_activity: bool,
    pub game_config: GameConfig,
    pub invitations: Vec<Invitation>,
    pub local_member: LocalMember,
    pub members: Vec<Member>,
    pub muc_jwt_dto: MucJwtDto,
    pub multi_user_chat_id: String,
    pub multi_user_chat_password: String,
    pub party_id: String,
    pub party_type: String,
    pub restrictions: Vec<Value>,
    pub scarce_positions: Vec<String>,
    pub warnings: Vec<Value>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct GameConfig {
    pub allowable_premade_sizes: Vec<i64>,
    pub custom_lobby_name: String,
    pub custom_mutator_name: String,
    pub custom_rewards_disabled_reasons: Vec<Value>,
    pub custom_spectator_policy: String,
    pub custom_spectators: Vec<Value>,
    pub custom_team100: Vec<Value>,
    pub custom_team200: Vec<Value>,
    pub game_mode: String,
    pub is_custom: bool,
    pub is_lobby_full: bool,
    pub is_team_builder_managed: bool,
    pub map_id: i64,
    pub max_human_players: i64,
    pub max_lobby_size: i64,
    pub max_team_size: i64,
    pub pick_type: String,
    pub premade_size_allowed: bool,
    pub queue_id: i64,
    pub should_force_scarce_position_selection: bool,
    pub show_position_selector: bool,
    pub show_quick_play_slot_selection: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Invitation {
    pub invitation_id: String,
    pub invitation_type: String,
    pub state: String,
    pub timestamp: String,
    pub to_summoner_id: i64,
    pub to_summoner_name: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct LocalMember {
    pub allowed_change_activity: bool,
    pub allowed_invite_others: bool,
    pub allowed_kick_others: bool,
    pub allowed_start_activity: bool,
    pub allowed_toggle_invite: bool,
    pub auto_fill_eligible: bool,
    pub auto_fill_protected_for_promos: bool,
    pub auto_fill_protected_for_remedy: bool,
    pub auto_fill_protected_for_soloing: bool,
    pub auto_fill_protected_for_streaking: bool,
    pub bot_champion_id: i64,
    pub bot_difficulty: String,
    pub bot_id: String,
    pub bot_position: String,
    pub bot_uuid: String,
    pub first_position_preference: String,
    pub intra_subteam_position: Value,
    pub is_bot: bool,
    pub is_leader: bool,
    pub is_spectator: bool,
    pub player_slots: Vec<Value>,
    pub puuid: String,
    pub quickplay_player_state: Value,
    pub ready: bool,
    pub second_position_preference: String,
    pub show_ghosted_banner: bool,
    pub strawberry_map_id: Value,
    pub subteam_index: Value,
    pub summoner_icon_id: i64,
    pub summoner_id: i64,
    pub summoner_internal_name: String,
    pub summoner_level: i64,
    pub summoner_name: String,
    pub team_id: i64,
    #[serde(rename = "tftNPEQueueBypass")]
    pub tft_npequeue_bypass: bool,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MucJwtDto {
    pub channel_claim: String,
    pub domain: String,
    pub jwt: String,
    pub target_region: String,
}

// Champ Select
#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChampSelectRoot {
    pub actions: Vec<Vec<Action>>,
    pub allow_battle_boost: bool,
    pub allow_duplicate_picks: bool,
    pub allow_locked_events: bool,
    pub allow_rerolling: bool,
    pub allow_skin_selection: bool,
    pub bans: Bans,
    pub bench_champions: Vec<Value>,
    pub bench_enabled: bool,
    pub boostable_skin_count: i64,
    pub chat_details: ChatDetails,
    pub counter: i64,
    pub game_id: i64,
    pub has_simultaneous_bans: bool,
    pub has_simultaneous_picks: bool,
    pub is_custom_game: bool,
    pub is_spectating: bool,
    pub local_player_cell_id: i64,
    pub locked_event_index: i64,
    pub my_team: Vec<MyTeam>,
    pub pick_order_swaps: Vec<Value>,
    pub recovery_counter: i64,
    pub rerolls_remaining: i64,
    pub skip_champion_select: bool,
    pub their_team: Vec<Value>,
    pub timer: Timer,
    pub trades: Vec<Trade>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Action {
    pub actor_cell_id: i64,
    pub champion_id: i64,
    pub completed: bool,
    pub id: i64,
    pub is_ally_action: bool,
    pub is_in_progress: bool,
    pub pick_turn: i64,
    #[serde(rename = "type")]
    pub type_field: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Bans {
    pub my_team_bans: Vec<i64>,
    pub num_bans: i64,
    pub their_team_bans: Vec<Value>,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct ChatDetails {
    pub muc_jwt_dto: MucJwtDto,
    pub multi_user_chat_id: String,
    pub multi_user_chat_password: String,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct MyTeam {
    pub assigned_position: String,
    pub cell_id: i64,
    pub champion_id: i64,
    pub champion_pick_intent: i64,
    pub name_visibility_type: String,
    pub obfuscated_puuid: String,
    pub obfuscated_summoner_id: i64,
    pub puuid: String,
    pub selected_skin_id: i64,
    #[serde(rename = "spell1Id")]
    pub spell1id: f64,
    #[serde(rename = "spell2Id")]
    pub spell2id: f64,
    pub summoner_id: i64,
    pub team: i64,
    pub ward_skin_id: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Timer {
    pub adjusted_time_left_in_phase: i64,
    pub internal_now_in_epoch_ms: i64,
    pub is_infinite: bool,
    pub phase: String,
    pub total_time_in_phase: i64,
}

#[derive(Default, Debug, Clone, PartialEq, Serialize, Deserialize)]
#[serde(rename_all = "camelCase")]
pub struct Trade {
    pub cell_id: i64,
    pub id: i64,
    pub state: String,
}