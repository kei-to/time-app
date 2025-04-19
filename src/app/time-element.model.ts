export interface TimeElementModel {
    label: string;                  // 表示用のラベル（例：テキスト1）
    time: Date;                     // ターゲット時間
    selectedMinutes: number | null; // ドロップダウン選択値（分単位）
    className: 'normal' | 'highlight'; // 表示スタイル用クラス
    alertDisabled: boolean;        // true ならチェックしない
}

