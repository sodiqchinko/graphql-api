export const pageSize = 2;
export const getPaginate = (page) => {

    const offset = (page === '1' ? 0 : page - 1) * pageSize;

    return {
        order: [
            ['createdAt', 'DESC'],
        ],
        limit: pageSize,
        offset: offset,
    }
}

export const paginatedResponse = (data) => {
    const totalPages = Math.ceil(data.count / pageSize);
    return {results: data.rows, limit: pageSize, totalPages: totalPages, total: data.count}
}
