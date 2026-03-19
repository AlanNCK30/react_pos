export const formatCurrency = (amount) => {
    return new Intl.NumberFormat("zh-HK", {
        style: "currency",
        currency: "HKD",
        minimumFractionDigits: 2,
    }).format(amount);
};


export const formatTimestamp = (timestamp) => {
    return new Intl.DateTimeFormat("zh-HK", {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(timestamp));
};

export const formatDateTime = (timestamp) => {
    return new Intl.DateTimeFormat("zh-HK", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    }).format(new Date(timestamp));
};
