export interface OrderDataResponse {
    TYPE: string
    M: string
    FSYM: string
    TSYM: string
    SIDE: number
    ACTION: number
    CCSEQ: number
    P: number
    Q: number
    SEQ: number
    category: string[]
    REPORTEDNS: number
    DELAYNS: number
    alertMessage?: string | string[]
}
