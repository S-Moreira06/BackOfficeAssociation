export function useHighlight() {
    const highlightText = (text, searchTerm) => {
        if (!searchTerm || typeof text !== 'string') return text;
        const regex = new RegExp(`(${searchTerm})`, 'gi');
        return text.replace(regex, '<span class="bg-yellow-300 font-bold">$1</span>');
    };

    return { highlightText };
}
