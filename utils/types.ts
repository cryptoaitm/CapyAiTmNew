export type IconProps = {
    size?: number;
    className?: string;
}

export interface Task {
    id: string;
    title: string;
    description: string;
    points: number;
    type: string;
    category: string;
    image: string;
    callToAction: string;
    taskData: any;
    taskStartTimestamp: Date | null;
    isCompleted: boolean;
}

export interface TaskPopupProps {
    task: Task;
    onClose: () => void;
    onUpdate: (updatedTask: Task) => void;
}

export interface User {
    _id: string;
    telegramId: string;
    name: string;
    isPremium: boolean;
    points: number;
    pointsBalance:number;
    multitapLevelIndex:number;
    energy:number;
    energyRefillsLeft:number;
    energyLimitLevelIndex:number;
    mineLevelIndex:number;
    lastPointsUpdateTimestamp:Date | null;
    lastEnergyUpdateTimestamp:Date | null;
    lastEnergyRefillsTimestamp:Date | null;
    referralPointsEarned:number;
    offlinePointsEarned:number;
}