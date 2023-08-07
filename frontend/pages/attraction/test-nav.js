import * as React from 'react';
import PropTypes from 'prop-types';
// mui
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { createTheme } from '@mui/material/styles'
// icon
import FavoriteIcon from '@mui/icons-material/Favorite'
import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import { yellow } from '@mui/material/colors'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { SlMagnifier } from 'react-icons/sl' //放大鏡icon
import { AiFillCar } from 'react-icons/ai' //車icon
// 介紹分頁元件
import Offcanvas from '@/components/attraction/itinerary/offcanvas'
// 景點卡片元件
import IBox from '@/components/attraction/itinerary/itinerary-box'
import { styled } from '@mui/system';

import Float from '@/components/attraction/float-btn'
function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;
  const color = yellow[500]
  
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Box sx={{ width: '25%', background: '#FFF7E3', height: '90vh' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', color: 'yellow' }}>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="warning"
            indicatorColor="#ffce56"
            variant="fullWidth"
            aria-label="basic tabs example"
            sx={{
              backgroundColor: '#0d5654',
              color: 'warning',
              maxHeight: '60px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',

              '& .MuiTab-root': {
                '&:hover': {
                  backgroundColor: '#0d5654', // 設定 hover 時的背景顏色為黃色
                  color: '#ffff', // 設定 hover 時的文字顏色為黑色
                },
              },

              // 點擊後的樣式
              '& .Mui-selected': {
                backgroundColor: '#ffce56',
                color: '#6b4f5b',
              },
              //點擊後的線條
              '& .MuiTabs-indicator': {
                backgroundColor: '#ffce56', // 將指示器顏色設定為黃色
              },
            }}
          >
            <Tab
              label="行程表"
              icon={<PlaylistAddCheckIcon />}
              iconPosition="end"
              sx={{
                backgroundColor: '#95d0c7',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '10px',
                maxHeight: '85vh',
              }}
              {...a11yProps(0)}
            />
            <Tab
              icon={<SearchRoundedIcon />}
              iconPosition="end"
              label="搜索"
              {...a11yProps(1)}
              sx={{
                backgroundColor: '#137976',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '10px',
              }}
            />
            <Tab
              icon={<FavoriteIcon />}
              iconPosition="end"
              label="收藏"
              {...a11yProps(2)}
              sx={{
                backgroundColor: '#95d0c7',
                color: 'white',
                fontSize: '20px',
                fontWeight: 'bold',
                padding: '10px',
              }}
            />
          </Tabs>
        </Box>
        <CustomTabPanel
          value={value}
          index={0}
          sx={{ backgroundColor: '#FFF7E3', color: 'white', maxHeight: '85vh' }}
        >
          {/* <IBox /> */}
        </CustomTabPanel>
        <CustomTabPanel value={value} index={1}>
          Item Two
        </CustomTabPanel>
        <CustomTabPanel value={value} index={2}>
          Item Three
        </CustomTabPanel>
      </Box>
      <Float love={false} path={'attraction'}/>
    </>
  )
}