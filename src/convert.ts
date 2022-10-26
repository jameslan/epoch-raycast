export interface ConvertResultItem {
    name: string;
    content: string;
}

export interface ConvertResult {
    items: ConvertResultItem[];
}

function convertTimestamp(results: ConvertResultItem[], milliSecond: number) {
    const dateTime = new Date(milliSecond);
    results.push({ name: 'GMT', content: dateTime.toUTCString() });
    results.push({ name: 'ISO', content: dateTime.toISOString() });
    results.push({
        name: 'Local',
        content: dateTime.toLocaleString(undefined, {
            weekday: 'short',
            day: '2-digit',
            month: 'short',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            fractionalSecondDigits: 3,
        }),
    });
}

export function convert(results: ConvertResultItem[], text: string) {
    if (text === '') {
        return;
    }

    // try timestamp
    const timestamp = Number(text);
    if (!isNaN(timestamp)) {
        // convert to number succeeded
        if (text.includes('.')) {
            // float
            convertTimestamp(results, timestamp * 1000);
        } else {
            // int
            convertTimestamp(results, timestamp);
        }
        return;
    }

    // try time string
}
