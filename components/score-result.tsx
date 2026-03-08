export interface ScoreData {
    candidate_name: string;
    match_score: number;
    missing_keywords: string[];
    reasoning: string;
}
const ScoreResult = ({ data }: { data: ScoreData }) => {
    return (
        <div className="w-full max-w-md border border-green-500 dark:border-green-700 p-5 mt-5 rounded bg-green-50 dark:bg-green-900/20">
            <h3 className="text-xl font-bold mb-2 text-gray-900 dark:text-gray-100">
                Results for {data.candidate_name}
            </h3>
            
            <div className="mb-4">
                <span className="text-3xl font-extrabold text-green-700 dark:text-green-400">{data.match_score}</span>
                <span className="text-lg text-gray-600 dark:text-gray-400"> / 100 Match</span>
            </div>

            <div className="mb-4">
                <h4 className="font-semibold text-red-600 dark:text-red-400">Missing Keywords:</h4>
                <div className="flex flex-wrap gap-2 mt-2">
                    {data.missing_keywords.length > 0 ? (
                        data.missing_keywords.map((kw, i) => (
                            <span key={i} className="bg-red-100 dark:bg-red-900/40 text-red-700 dark:text-red-300 px-2 py-1 text-xs rounded border border-red-200 dark:border-red-800/50">
                                {kw}
                            </span>
                        ))
                    ) : (
                        <span className="text-sm text-gray-500 dark:text-gray-400">None found!</span>
                    )}
                </div>
            </div>

            <div>
                <h4 className="font-semibold text-gray-800 dark:text-gray-200">Reasoning:</h4>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{data.reasoning}</p>
            </div>
        </div>
    );
};

export default ScoreResult;