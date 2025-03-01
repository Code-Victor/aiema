import { router } from "react-query-kit";
import * as api from "..";


export const authRouter= router("auth",{
  login: router.mutation({
    mutationFn: api.login,
  })  ,
    signup: router.mutation({
        mutationFn: api.Signup,
    }),
    getUserDetails: router.query({
        fetcher: api.getUserDetials,
    }),
})