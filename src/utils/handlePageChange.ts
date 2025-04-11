/**
 * Updates the page parameter in the URL and navigates to the new page.
 * 
 * @param newPage - The new page number to navigate to.
 * @param totalPages - The total number of pages available.
 * @param searchParams - The current URLSearchParams object.
 * @param router - The router object used for navigation.
 */
export const handlePageChange = (
    newPage: number,
    totalPages: number,
    searchParams: URLSearchParams,
    router: any
): void => {
    if (newPage >= 1 && newPage <= totalPages) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", newPage.toString());
        router.push(`?${params.toString()}`);
    }
};