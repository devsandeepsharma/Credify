const generateRandomString = (length = 6) => {
    return Math.random().toString(36).substring(2, 2 + length);
}

export const generateSlug = (name) => {
    const slugBase = name.trim().toLowerCase().replace(/\s+/g, '-');
    const randomStr = generateRandomString();
    return `${randomStr}-${slugBase}`;
}