import axios from "axios";
import { getCookie, setCookie } from "cookies-next";
import { GetServerSidePropsContext } from "next";

type IsAuthInput = {
    isRequiredRefreshToken: boolean;
    req: GetServerSidePropsContext["req"],
    res: GetServerSidePropsContext["res"],
}

export const isAuth = async ({
    isRequiredRefreshToken,
    req,
    res,
}: IsAuthInput) => {
    const accessToken = getCookie('accessToken', { req });
    let isLogin = false;
    if (accessToken) {
        isLogin = true
    }
    if (!accessToken && isRequiredRefreshToken) {
        const refreshToken = getCookie('refreshToken', { req });
        try {
            const refreshTokenUrl = process.env.SPOTIFY_REFRESH_TOKEN_URI as string;
            const response = await axios.get(refreshTokenUrl,{
                headers: {
                    'Cookie': `refreshToken=${refreshToken}`
                }
            });
            setCookie('accessToken', response.data.accessToken, { res, req, maxAge: 3600 })

            if (response.data.refreshToken) {
                setCookie('refreshToken', response.data.refreshToken, { res, req, maxAge: 3600 * 24 * 2 })
            }
            isLogin = true
        } catch (error) {
            isLogin = false
        }
    }
    return isLogin
}
