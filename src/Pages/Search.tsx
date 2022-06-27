import { Box, Button, Stack, TextField } from "@mui/material";
import { useState } from "react";
import { useHistory } from "react-router-dom";

const Search: React.FC = () => {

    const [country, setCountry] = useState<String>('')

    let history = useHistory();

    const handle_country_info = (e: any) => {
        e.preventDefault();
        history.push(`/details/${country}`);
    }


    return (
        <>
            <Box mt={5}>
                <Stack >
                    <form onSubmit={handle_country_info}>

                        <Stack direction='row' justifyContent='center' alignItems='center' spacing={2} >

                            <TextField required label='Enter Country Name' size='small' sx={{ boxShadow: 3 }}
                                inputProps={{
                                    "data-testid": "inputField",
                                }}
                                onChange={(e) => {
                                    setCountry(e.target.value)
                                }}
                            />

                            <Button variant="contained" type="submit" sx={{ boxShadow: 3 }} disabled={!country} data-testid="submit_button">Search</Button>
                        </Stack>
                    </form>
                </Stack>
            </Box>
        </>
    );
};

export default Search;