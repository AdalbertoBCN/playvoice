// Lobby structures
export interface Member {
    allowedChangeActivity: boolean;
    allowedInviteOthers: boolean;
    allowedKickOthers: boolean;
    allowedStartActivity: boolean;
    allowedToggleInvite: boolean;
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForRemedy: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    botId: string;
    botPosition: string;
    botUuid: string;
    firstPositionPreference: string;
    intraSubteamPosition: any; // JSON value
    isBot: boolean;
    isLeader: boolean;
    isSpectator: boolean;
    playerSlots: any[]; // Array of any to represent JSON values
    puuid: string;
    quickplayPlayerState: any; // JSON value
    ready: boolean;
    secondPositionPreference: string;
    showGhostedBanner: boolean;
    strawberryMapId: any; // JSON value
    subteamIndex: any; // JSON value
    summonerIconId: number;
    summonerId: number;
    summonerInternalName: string;
    summonerLevel: number;
    summonerName: string;
    teamId: number;
    tftNpeQueueBypass: boolean;
  }
  
  export interface LobbyRoot {
    canStartActivity: boolean;
    gameConfig: GameConfig;
    invitations: Invitation[];
    localMember: LocalMember;
    members: Member[];
    mucJwtDto: MucJwtDto;
    multiUserChatId: string;
    multiUserChatPassword: string;
    partyId: string;
    partyType: string;
    restrictions: any[]; // Array of any to represent JSON values
    scarcePositions: string[];
    warnings: any[]; // Array of any to represent JSON values
  }
  
  export interface GameConfig {
    allowablePremadeSizes: number[];
    customLobbyName: string;
    customMutatorName: string;
    customRewardsDisabledReasons: any[]; // Array of any to represent JSON values
    customSpectatorPolicy: string;
    customSpectators: any[]; // Array of any to represent JSON values
    customTeam100: any[]; // Array of any to represent JSON values
    customTeam200: any[]; // Array of any to represent JSON values
    gameMode: string;
    isCustom: boolean;
    isLobbyFull: boolean;
    isTeamBuilderManaged: boolean;
    mapId: number;
    maxHumanPlayers: number;
    maxLobbySize: number;
    maxTeamSize: number;
    pickType: string;
    premadeSizeAllowed: boolean;
    queueId: number;
    shouldForceScarcePositionSelection: boolean;
    showPositionSelector: boolean;
    showQuickPlaySlotSelection: boolean;
  }
  
  export interface Invitation {
    invitationId: string;
    invitationType: string;
    state: string;
    timestamp: string;
    toSummonerId: number;
    toSummonerName: string;
  }
  
  export interface LocalMember {
    allowedChangeActivity: boolean;
    allowedInviteOthers: boolean;
    allowedKickOthers: boolean;
    allowedStartActivity: boolean;
    allowedToggleInvite: boolean;
    autoFillEligible: boolean;
    autoFillProtectedForPromos: boolean;
    autoFillProtectedForRemedy: boolean;
    autoFillProtectedForSoloing: boolean;
    autoFillProtectedForStreaking: boolean;
    botChampionId: number;
    botDifficulty: string;
    botId: string;
    botPosition: string;
    botUuid: string;
    firstPositionPreference: string;
    intraSubteamPosition: any; // JSON value
    isBot: boolean;
    isLeader: boolean;
    isSpectator: boolean;
    playerSlots: any[]; // Array of any to represent JSON values
    puuid: string;
    quickplayPlayerState: any; // JSON value
    ready: boolean;
    secondPositionPreference: string;
    showGhostedBanner: boolean;
    strawberryMapId: any; // JSON value
    subteamIndex: any; // JSON value
    summonerIconId: number;
    summonerId: number;
    summonerInternalName: string;
    summonerLevel: number;
    summonerName: string;
    teamId: number;
    tftNpeQueueBypass: boolean;
  }
  
  export interface MucJwtDto {
    channelClaim: string;
    domain: string;
    jwt: string;
    targetRegion: string;
  }