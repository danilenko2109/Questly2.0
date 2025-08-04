import { Typography } from "@mui/material";
import Form from "./Form";
import styles from "./LogInPage.module.scss";
import { useTheme } from "@mui/material/styles";
import classNames from "classnames";

const LoginPage = () => {
  const theme = useTheme();
  
  // Динамические классы для темы
  const themeClasses = {
    [styles.header]: true,
    [styles[`header--${theme.palette.mode}`]]: true,
  };

  const contentClasses = {
    [styles.content]: true,
    [styles[`content--${theme.palette.mode}`]]: true,
  };

  return (
    <div className={styles.loginContainer}>
      <header className={classNames(themeClasses)}>
        <Typography className={styles.header__title} color="primary">
          Sociopedia
        </Typography>
      </header>

      <main className={classNames(contentClasses)}>
        <Typography className={styles.content__title} variant="h5">
          Welcome to Socipedia, the Social Media for Sociopaths!
        </Typography>
        <Form />
      </main>
    </div>
  );
};

export default LoginPage;