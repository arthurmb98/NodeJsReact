import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import BusinessIcon from '@material-ui/icons/Business';
import PersonIcon from '@material-ui/icons/Person';
import GroupIcon from '@material-ui/icons/Group';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';

import ListarEmpresas from './Empresa/listar-empresas';
import ListarFornecedores from './Fornecedor/listar-fornecedores';
import ListarVinculos from './Vinculo/listar-vinculos';

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box p={3}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        position: 'relative',
        minHeight: 200,
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(2),
        right: theme.spacing(2),
    },
}));

export default function Menu() {
    const classes = useStyles();
    const theme = useTheme();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div className={classes.root}>
            <AppBar position="static" color="default">
                <Tabs
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    aria-label="action tabs example"
                >
                    <Tab label="Empresas" {...a11yProps(0)} icon={<BusinessIcon />} />
                    <Tab label="Fornecedores" {...a11yProps(1)} icon={<PersonIcon />} />
                    <Tab label="Vinculos" {...a11yProps(2)} icon={<GroupIcon />} />
                </Tabs>
            </AppBar>
            <TabPanel value={value} index={0} dir={theme.direction}>
                <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
                    <ListarEmpresas />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={1} dir={theme.direction}>
                <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
                    <ListarFornecedores />
                </Paper>
            </TabPanel>
            <TabPanel value={value} index={2} dir={theme.direction}>
                <Paper style={{ maxHeight: '70vh', overflow: 'auto' }}>
                    <ListarVinculos />
                </Paper>
            </TabPanel>
        </div>
    );
}