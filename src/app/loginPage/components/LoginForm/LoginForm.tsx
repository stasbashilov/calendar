import { Input, Button, FormControl, FormLabel } from "@mui/material";

const LoginForm = () => {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh'
    }}>
      <form style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        width: '300px'
      }}>
        <FormControl fullWidth>
          <FormLabel htmlFor="email">Email</FormLabel>
          <Input
            id="email"
            color="primary"
            type="email"
            name="email"
            placeholder="Email"
          />
        </FormControl>

        <FormControl fullWidth>
          <FormLabel htmlFor="password">Password</FormLabel>
          <Input
            id="password"
            color="primary"
            type="password"
            name="password"
            placeholder="Password"
          />
        </FormControl>

        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '20px'
        }}>
          <Button variant="contained" color="primary">
            Sign In
          </Button>
          <Button variant="outlined" color="secondary">
            Sign Up
          </Button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
