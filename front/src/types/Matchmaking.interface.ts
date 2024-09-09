// Matchmaking structures
export interface MatchRoot {
    dodgeData: DodgeData;
    errors: any[]; // Array of any to represent JSON values
    estimatedQueueTime: number;
    isCurrentlyInQueue: boolean;
    lobbyId: string;
    lowPriorityData: LowPriorityData;
    queueId: number;
    readyCheck: ReadyCheck;
    searchState: string;
    timeInQueue: number;
  }
  
  export interface DodgeData {
    dodgerId: number;
    state: string;
  }
  
  export interface LowPriorityData {
    bustedLeaverAccessToken: string;
    penalizedSummonerIds: any[]; // Array of any to represent JSON values
    penaltyTime: number;
    penaltyTimeRemaining: number;
    reason: string;
  }
  
  export interface ReadyCheck {
    declinerIds: any[]; // Array of any to represent JSON values
    dodgeWarning: string;
    playerResponse: string;
    state: string;
    suppressUx: boolean;
    timer: number;
  }