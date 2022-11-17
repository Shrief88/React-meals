import Header from "../Header";
import { test,describe } from "vitest";
import { render,screen } from "@testing-library/react";

describe('Header component',()=>{
    test('render the correct header',()=>{
        render(<Header/>);
        const headerElement = screen.getByRole('heading');
        expect(headerElement.textContent).toMatch(/reactmeals/i);
    })
})