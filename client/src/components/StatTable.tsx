import { Box, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { FC } from "react";

interface Props {
    stats: any[];
    values: any[];
    name: string;
}

const styles = {
    table: {
        width: '80%',
        margin: 'auto',
    },
    flexColCenter: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'start',
        width: '50%'
    }
}

const StatTable: FC<Props> = (props) => {

    const { stats, values, name } = props;

    return (
        <TableContainer sx={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', padding: '16px' }} component={Box}>
            <Typography variant="h5" sx={{ alignSelf: 'start', width: '80%', margin: 'auto', fontWeight: '900' }}>{name}</Typography>
            <Table sx={{ minWidth: '300px', width: '80%' }}>
                <TableHead sx={{ borderBottom: '3px solid green' }}>
                    <TableRow>
                        <TableCell sx={{ fontWeight: '900', fontSize: '1.1rem', paddingLeft: '0' }}>Stat</TableCell>
                        <TableCell sx={{ fontWeight: '900', fontSize: '1.1rem', paddingLeft: '0' }}>Value</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        stats.map((stat, index) => {
                            if (!stat || stat === "") return;
                            return (
                                <TableRow key={stat} sx={{ borderBottom: index !== stats.length - 1 ? '2px solid black' : '2px solid transparent' }}>
                                    <TableCell sx={{ fontWeight: 'bold', paddingLeft: '0' }}>{stat}</TableCell>
                                    <TableCell sx={{ paddingLeft: '0' }}>{values[index]}</TableCell>
                                </TableRow>
                            )
                        })
                    }
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default StatTable; 