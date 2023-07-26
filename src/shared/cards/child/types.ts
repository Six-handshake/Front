export interface CardChildPropsType {
    data: {
        companyName?: string,
        id?: string
        adress?: string,
        description?: string,
        phone?: string,
        handleCardClick?: (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => void 
    }
}
