import { JupToken, Profile } from "@/types";
import { create } from "zustand";

interface ITokenStore {
    tokens: null | JupToken[];
    selectedToken: null | JupToken
    setTokens: (tokens: JupToken[]) => void;
    setSelectedToken: (selectedToken: JupToken) => void;
}

interface IProfileStore {
    profile: null | Profile
    setProfile: (profile: Profile) => void;
}

const useTokenStore = create<ITokenStore>((set) => ({
    tokens: null,
    selectedToken: null,
    setTokens: (tokens) =>
        set({
            tokens: tokens,
        }),
    setSelectedToken: (selectedToken) =>
        set({
            selectedToken: selectedToken,
        }),
}));

const useProfileStore = create<IProfileStore>((set) => ({
    profile: null,
    setProfile: (profile) =>
        set({
            profile: profile,
        }),
}));

export { useTokenStore, useProfileStore };