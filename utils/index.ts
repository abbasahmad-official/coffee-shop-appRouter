export const getDomain = () => {
    const domain = process.env.NODE_ENV === 'production' ? process.env.PRODUCTION_URL : "http://localhost:3000";
    if(!domain) {
        throw new Error('Domain is not defined in environment variables');
    }

    return  new URL(domain);
}