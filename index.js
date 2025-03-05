import 'dotenv/config';
import { REST } from 'discord.js';

const rest = new REST({ version: '8' })
    .setToken(`${process.env.DISCORD_TOKEN}`);
rest.options.authPrefix = '';

// const res = await rest.get('/users/@me'); // fetching user data
// console.log(res);

const vanityPatch = rest.patch(
    `/guilds/${process.env.DISCORD_GUILD_ID}/vanity-url`,
    {
        body: { code: '20334' },
    }
)

vanityPatch.catch(async err => {
    console.log(err.rawError);

    const ticket = err.rawError.mfa.ticket;
    const response = rest.post('/mfa/finish', {
        body: {
            ticket: ticket,
            mfa_type: "password",
            data: process.env.DISCORD_PASS
        },
        auth: false,
        headers: { Authorization: `${process.env.DISCORD_TOKEN}` },
    });

    response.catch(async err => {
        console.log(err.rawError);
    });
});

process.on('unhandledRejection', err => console.error(err));
process.on('uncaughtException', err => console.error(err));