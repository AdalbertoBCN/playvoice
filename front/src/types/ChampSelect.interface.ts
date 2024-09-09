export interface ChampSelectRoot {
    actions: Action[][]
    allowBattleBoost: boolean
    allowDuplicatePicks: boolean
    allowLockedEvents: boolean
    allowRerolling: boolean
    allowSkinSelection: boolean
    bans: Bans
    benchChampions: any[]
    benchEnabled: boolean
    boostableSkinCount: number
    chatDetails: ChatDetails
    counter: number
    gameId: number
    hasSimultaneousBans: boolean
    hasSimultaneousPicks: boolean
    isCustomGame: boolean
    isSpectating: boolean
    localPlayerCellId: number
    lockedEventIndex: number
    myTeam: MyTeam[]
    pickOrderSwaps: any[]
    recoveryCounter: number
    rerollsRemaining: number
    skipChampionSelect: boolean
    theirTeam: any[]
    timer: Timer
    trades: Trade[]
  }
  
  export interface Action {
    actorCellId: number
    championId: number
    completed: boolean
    id: number
    isAllyAction: boolean
    isInProgress: boolean
    pickTurn: number
    type: string
  }
  
  export interface Bans {
    myTeamBans: number[]
    numBans: number
    theirTeamBans: any[]
  }
  
  export interface ChatDetails {
    mucJwtDto: MucJwtDto
    multiUserChatId: string
    multiUserChatPassword: string
  }
  
  export interface MucJwtDto {
    channelClaim: string
    domain: string
    jwt: string
    targetRegion: string
  }
  
  export interface MyTeam {
    assignedPosition: string
    cellId: number
    championId: number
    championPickIntent: number
    nameVisibilityType: string
    obfuscatedPuuid: string
    obfuscatedSummonerId: number
    puuid: string
    selectedSkinId: number
    spell1Id: number
    spell2Id: number
    summonerId: number
    team: number
    wardSkinId: number
  }
  
  export interface Timer {
    adjustedTimeLeftInPhase: number
    internalNowInEpochMs: number
    isInfinite: boolean
    phase: string
    totalTimeInPhase: number
  }
  
  export interface Trade {
    cellId: number
    id: number
    state: string
  }
  