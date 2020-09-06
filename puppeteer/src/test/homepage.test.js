const timeout = 10000;

beforeAll(async() => {
    jest.setTimeout(10000);
    await page.goto(URL, { waitUntil: "domcontentloaded" });
    await page.waitFor(2000);
    await page.click('button');

});

describe("Test access to register", () => {
    test("Check page header", async() => {
        await page.waitFor(3500);
        const h2Handle = await page.$("h2");
        const html = await page.evaluate(h2Handle => h2Handle.innerHTML, h2Handle);
        expect(html).toBe("Register");
    }, timeout);

    test("Cancel register", async() => {
        await page.waitFor(2000);
        await expect(page).toClick('.btn-link');
        const h2Handle = await page.$("h2");
        const html = await page.evaluate(h2Handle => h2Handle.innerHTML, h2Handle);
        expect(html).toBe("Login");
    }, timeout);
});

test("Test for incomplete form", async() => {
    await page.waitFor(2000);
    await expect(page).toClick('.btn-link');
    await expect(page).toFill('input[formcontrolname="firstName"]', 'Isabella');
    await expect(page).toFill('input[formcontrolname="lastName"]', 'Cardenas');
    await expect(page).toClick('button[class="btn btn-primary"]');
    await page.waitFor(3000);
    await expect(page).toMatchElement('div', { text: 'Username is required' })
    await expect(page).toMatchElement('div', { text: 'Password is required' })
}, timeout);

test("Complete form and register", async() => {
    await page.waitFor(2000);
    await expect(page).toFill('input[formcontrolname="firstName"]', 'Isabella');
    await expect(page).toFill('input[formcontrolname="lastName"]', 'Cardenas');
    await expect(page).toFill('input[formcontrolname="username"]', 'bella9330');
    await expect(page).toFill('input[formcontrolname="password"]', 'c0v1d19-2020');
    await expect(page).toClick('button[class="btn btn-primary"]');
    await page.waitFor(3000);
    await expect(page).toMatchElement('.alert-success');
}, timeout);