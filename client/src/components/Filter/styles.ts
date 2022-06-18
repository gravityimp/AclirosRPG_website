
export const styles = {
    filterBox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px',

        width: '100%',
    },
    search: {
        width: '100%',
        margin: '4px 16px 8px 16px',
    },
    filters: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        flexWrap: 'wrap',
        '@media (max-width: 600px)': {
            flexDirection: 'column',
        }
    },
    input: {
        width: '20%',
        mx: '8px',
        minWidth: '200px',
        marginY: '8px'
    }
};