/**
 * Updates the limit parameter in the URL and navigates to the first page.
 * 
 * @param newLimit - The new limit value to be set.
 * @param searchParams - The current URLSearchParams object.
 * @param router - The router object used for navigation.
 */
export const handleLimitChange = (
    newLimit: number,
    searchParams: URLSearchParams,
    router: any
): void => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", newLimit.toString());
    params.set("page", "1"); // Reset to the first page when changing the limit
    router.push(`?${params.toString()}`);
};