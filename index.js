import 'dotenv/config';
import discord from 'discord.js-selfbot-v13';
// import axios from 'axios';
import { REST } from 'discord.js';

process.on('unhandledRejection', err => {});
process.on('uncaughtException', err => {});

const client = new discord.Client();
// { intents: 131071 }

client.on('ready', async () => {
    console.log(`Bot is ready with username ${client.user.username}`);

    // client.acceptInvite('2032').then((invite) => {
    //     console.log('joined');
    // });

    // const guild = client.guilds.cache.get(process.env.DISCORD_GUILD_ID);

    const rest = new REST({ version: '6' }).setToken(`${process.env.DISCORD_TOKEN}`);
    await rest.patch(`/guilds/${process.env.DISCORD_GUILD_ID}/vanity-url`, {
        body: { code: '20334' },
        authPrefix: ""
    }).catch(async err => {
        console.log(err.rawError);
        const ticket = err.rawError.mfa.ticket;
        const response = await rest.post('/mfa/finish', {
            body: {
                ticket: ticket,
                mfa_type: "password",
                data: process.env.DISCORD_PASS
            },
            auth: false,
            headers: {
                "Authorization": `${process.env.DISCORD_TOKEN}`
            }
        }).catch(async err => {
            console.log(err);
            console.log('no shit we didnt got it');
        }).then(a => {
            console.log('think we got it.')
        });
    });

    // const vanityData = await guild.fetchVanityData();
    // console.log(vanityData);

    // const vanityPatch = await axios.patch(`https://discord.com/api/v9/guilds/${process.env.DISCORD_GUILD_ID}/vanity-url`,
    //     {
    //         code: "2033",
    //     },
    //     {
    //         headers: {
    //             "Authorization": `${process.env.DISCORD_TOKEN}`,
    //         }
    //     }
    // ).catch(err => console.error(err.message));
    //
    // console.log(vanityPatch);


    // await guild.setVanityCode('2033')
    //     .catch(async err => {
    //         // if (err.message === "Two factor is required for this operation")
    //         console.log(err.message);
    //         const ticket = err.message.split('\n')[1];
    //         console.log(ticket);
    //
    //
    //     }).then(() => {
    //         console.log('vanity changed successfully.');
    //     });

    // const response = await axios.post(
    //     'https://discord.com/api/v9/mfa/finish',
    //     {
    //         ticket: ticket,
    //         mfa_type: "password",
    //         data: process.env.DISCORD_PASS
    //     },
    //     {
    //         headers: {
    //             "Content-Type": "application/json",
    //             "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/18.3 Safari/605.1.15",
    //             "Referer": "https://discord.com"
    //         }
    //     }
    // ).catch(async err => {
    //     console.log(err.message);
    // });
    // console.log(response);

    // try {
    //     const inv = await client.fetchInvite('1928');
    //     console.log(inv);
    // } catch (err) {
    //     console.error(err.message === "Unknown Invite" ? 'unknown' : err.message);
    // }

    // setInterval(async () => {
    //     await guild.setVanityCode('1928');
    // }, 1000);
});

// client.passLogin(process.env.DISCORD_EMAIL, process.env.DISCORD_PASS);
client.login(process.env.DISCORD_TOKEN);