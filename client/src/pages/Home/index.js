import React, { useRef } from 'react';
import { Button, Box, AppBar, Toolbar, Typography, Container, Card, CardMedia, CssBaseline, useMediaQuery, useTheme ,Grid } from '@mui/material';
import { styled } from '@mui/system';
import logo from './assets/logo.png'
import carImage from './assets/1.png'
import avtoDromImage from './assets/avtodrom.png'
import {Link} from 'react-router-dom'
const StyledAppBar = styled(AppBar)(({ theme }) => ({
  marginBottom: `${theme.spacing(4)}px`,
}));

const StyledToolbar = styled(Toolbar)({
  display: 'flex',
  justifyContent: 'space-between',
  backgroundColor: '#fff',
});

const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: theme.spacing(2),
  backgroundColor: '#f5f5f5',
  padding: theme.spacing(2),
}));

const StyledContent = styled(Box)(({ theme }) => ({
  height: '80vh',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  marginBottom: `${theme.spacing(4)}px`,
}));

const StyledCardMedia = styled(CardMedia)({
  height: 0,
  paddingTop: '56.25%', // 16:9 aspect ratio
});

const Home = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  

  const content1Ref = useRef(null);
  const content2Ref = useRef(null);
  const content3Ref = useRef(null);

  const scrollToContent = (ref) => {
    window.scrollTo({
      top: ref.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <Box>
      <CssBaseline />
      <StyledAppBar position="fixed">
        <StyledToolbar>
        <img alt="Logo" src={logo} style={{height: isMobile ? '30px' : '100px'}}/> {/* Replace 'logo.jpg' with the path to your logo image */}

        
          <Box display="flex" justifyContent="flex-end" flexGrow={1}>
          <Button sx={{ color: 'rgb(2, 13, 68)', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }} onClick={() => scrollToContent(content1Ref)}>Запись на Вождение</Button>
          <Button sx={{ color: 'rgb(2, 13, 68)', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }} onClick={() => scrollToContent(content1Ref)}>Советы по Вождению</Button>
          <Button sx={{ color: 'rgb(2, 13, 68)', fontWeight: 'bold', '&:hover': { textDecoration: 'underline' } }} onClick={() => scrollToContent(content1Ref)}>Карта Автодрома</Button>

         </Box>
        </StyledToolbar>
      </StyledAppBar>
      <Toolbar /> 
      <Container style={{paddingTop: '64px',}}>
 

      
      <Grid container spacing={2} ref={content1Ref}>
      <Grid  container item xs={12} md={6} sx={{margin: "70px 0"}}>
         
         <Typography sx={{ color: 'rgb(2, 13, 68)' }} variant="h4" gutterBottom>Запись на Вождение 2023</Typography>
          <Typography sx={{ color: 'rgb(2, 13, 68)' }} variant="h6" gutterBottom>→ Легко и быстро зарегистрироваться на сдачу вождения.</Typography>
            <Typography sx={{ color: 'rgb(2, 13, 68)' }} variant="h6" gutterBottom>→ Выберите подходящеe время и дату онлайн.</Typography>
          <Typography  sx={{ color: 'rgb(2, 13, 68)' }} variant="h6" gutterBottom>→ Бронируйте место для сдачи экзамена по вождению, используя наше удобное мобильное приложение.</Typography>
          <Grid item sx={{ margin : "50px 0 " }}>
          <Button variant="contained" color="primary" component={Link} to="/booking">Записаться</Button>
          </Grid>
         </Grid>
      <Grid item xs={12} md={6}>
           <img src={carImage} alt="Description" style={{width: '100%'}} />
          </Grid>
        </Grid>
        
        <Grid container spacing={2} direction="column" ref={content2Ref} justifyContent="center">
      <Grid item xs={12}>
    <Typography variant="h2" sx = {{margin: "50px 250px",  fontWeight: 'bold'}}>Советы по Вождению</Typography>
        </Grid>
          <Grid item xs={12}>
        <StyledCard>
      <Typography variant="body1" sx = {{fontSize:'20px'}}>
      Перед началом практического экзамена проверьте предоставленный вам автомобиль. Если в нем что-то неисправно, что по вашему мнению, может помешать вам, вы имеете права отказаться от этой машины.
    <br/>
    <br/>
По возможности сделайте пробный круг по автодрому СпецЦОНа. Такая услуга есть в прайсе: 1 круг – 15 минут – 4000 тенге. Однако получить ее не всегда возможно: в день СпецЦОН в состоянии пропустить не более 70 человек, но бывают и «бурные» дни, когда в очереди до 300-400 человек, так что тут не до «тренировок».
<br/>
<br/>
    
Записывайтесь на экзамен пораньше – «свежая» голова лучше соображает.
<br/>
<br/>
Во время обучения запоминайте, а лучше даже записывайте советы инструктора.
<br/>
<br/>
Не заучивайте правильные ответы, лучше разбирайтесь в каждой конкретной ситуации и делайте выводы. Так информация запоминается легче и надежнее.
<br/>
<br/>
Во время обучения вождению не поддавайтесь на провокации инструктора – он может намеренно вводить вас в заблуждение. Если вы с чем-то не согласны, у вас есть право отстаивать свою позицию.      </Typography>
        </StyledCard>
        </Grid>
        </Grid>



        <Grid container direction="column" spacing={2} ref={content3Ref}>
  <Grid item xs={12} md={6}>
    <Typography variant="h2" sx= {{margin: "50px 250px",  fontWeight: 'bold'}}>Карта Автодрома</Typography>
  </Grid>
  <Grid item xs={12} md={6}>
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <img src={avtoDromImage} alt="Description" />
      </Grid>
      <Grid item xs={6}>
        <StyledCard>
          <Typography variant="body1">

          1. "Старт"
          <br/>
<br/>
2. "Проезд пешеходного перехода"
<br/>
<br/>
3. "Проезд регулируемого перекрестка"
<br/>
<br/>
4. "Разворот и парковка"
<br/>
<br/>
5. "Повороты на 90 градусов"
<br/>
<br/>
6. "Змейка"
<br/>
<br/>
7. "Параллельная парковка задним ходом"
<br/>
<br/>
8. "Проезд железнодорожного переезда"
<br/>
<br/>
9. "Полоса разгона"
<br/>
<br/>
10. "Остановка и начало движения на подъеме"
<br/>
<br/>
11. "Аварийная остановка"
<br/>
<br/>
12. "Финиш"          </Typography>
        </StyledCard>
      </Grid>
    </Grid>
  </Grid>
</Grid>
      </Container>

    </Box>
  );
};

export default Home;
