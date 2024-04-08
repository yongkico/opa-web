import { DataResponse } from '@/@types'
import { Rule } from '@/@types/Rule'
import { create } from 'zustand'

type RuleStore = {
    isFetching: boolean
    setIsFetching: (isFetching: boolean) => void
    isCreating: boolean
    setIsCreating: (isCreating: boolean) => void
    isUpdating: boolean
    setIsUpdating: (isUpdating: boolean) => void
    isDeleting: boolean
    setIsDeleting: (isDeleting: boolean) => void
    rules: DataResponse<Rule[]>
    setRules: (rules: DataResponse<Rule[]>) => void
    rule: DataResponse<Rule>
    setRule: (rule: DataResponse<Rule>) => void
}

export const ruleStore = create<RuleStore>()((set) => ({
    isFetching: false,
    setIsFetching: (isFetching) => set({ isFetching }),
    isCreating: false,
    setIsCreating: (isCreating) => set({ isCreating }),
    isUpdating: false,
    setIsUpdating: (isUpdating) => set({ isUpdating }),
    isDeleting: false,
    setIsDeleting: (isDeleting) => set({ isDeleting }),
    rules: {} as DataResponse<Rule[]>,
    setRules: (rules: DataResponse<Rule[]>) => set({ rules }),
    rule: {} as DataResponse<Rule>,
    setRule: (rule: DataResponse<Rule>) => set({ rule }),
}))
