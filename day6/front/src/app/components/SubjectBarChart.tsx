type Props = {
    bySubject: Record<string, number>
}

export default function SubjectBarChart({ bySubject }: Props) {
    const max = Math.max(...Object.values(bySubject))

    return (
        <div className="space-y-4">
            {Object.entries(bySubject).map(([name, minutes]) => (
                <div key={name}>
                    <div className="flex justify-between text-sm mb-1">
                        <span>{name}</span>
                        <span>{minutes}</span>
                    </div>

                    <div className="h-3 bg-gray-200 rounded">
                        <div
                            className="h-3 bg-blue-500 rounded"
                            style={{
                                width: `${(minutes / max) * 100}%`,
                            }}/>
                    </div>
                </div>
            ))}
        </div>
    )
}