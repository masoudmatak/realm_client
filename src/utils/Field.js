import React, { isValidElement } from 'react';
import { FormFeedback, FormGroup, Label, Input } from 'reactstrap';


export default class Field {

    constructor(keyUpCallback) {
        this.keyUpCallback = keyUpCallback;
        this.doFormatControl = keyUpCallback != null;
    }

    handleKeyUp = (e) => {
        if (this.keyUpCallback) {
            this.keyUpCallback(e);
        }
    }


    getDateForm(item) {
        const showAsValid = this.doFormatControl && !item.mandatory;
        const showAsInvalid = this.doFormatControl && item.mandatory;
        let errText = "Exempel: " + item.placeholder + ".";
        if (item.mandatory) errText = "Måste fyllas i. " + errText;
        return (
            <FormGroup>
                <Label>{item.name}</Label>
                <Input key={item.id}
                    type="date"
                    name={item.name}
                    id={item.id}
                    format={item.format}
                    placeholder="date placeholder"
                    {...(showAsValid && { valid: true })}
                    {...(showAsInvalid && { invalid: true })}
                    onChange={(v) => this.handleKeyUp(v)}
                />
                <FormFeedback>{errText}</FormFeedback>
            </FormGroup>
        );
    }


    getTextForm(item) {
        const showAsValid = this.doFormatControl && !item.mandatory;
        const showAsInvalid = this.doFormatControl && item.mandatory;
        let errText = "Exempel: " + item.placeholder + ".";
        if (item.mandatory) errText = "Måste fyllas i. " + errText;
        return (
            <FormGroup key={item.id}>
                <Label>{item.name}</Label>
                <Input type="text"
                    id={item.id}
                    name={item.name}
                    format={item.format}
                    placeholder={item.placeholder}
                    {...(showAsValid && { valid: true })}
                    {...(showAsInvalid && { invalid: true })}
                    onKeyUp={(v) => this.handleKeyUp(v)}
                />
                <FormFeedback>{errText}</FormFeedback>
            </FormGroup>
        );
    }

    getSelectForm(item) {
        const showAsValid = this.doFormatControl && !item.mandatory;
        const showAsInvalid = this.doFormatControl && item.mandatory;
        let errText = "Exempel: " + item.placeholder + ".";
        if (item.mandatory) errText = "Måste fyllas i. " + errText;
        const values = "," + item.values;
        return (
            <FormGroup key={item.id}>
                <Label name={item.name}>{item.name}</Label>
                <Input type="select"
                    id={item.id}
                    format={item.format}
                    {...(showAsValid && { valid: true })}
                    {...(showAsInvalid && { invalid: true })}
                    onChange={(v) => this.handleKeyUp(v)}
                    placeholder={item.placeholder}>
                    {values.split(',').map((v, i) => { return <option key={i}>{v}</option> })}
                </Input>
                <FormFeedback>{errText}</FormFeedback>
            </FormGroup>
        );
    }

    getForm(item) {
        if (item.type === 'text') return this.getTextForm(item);
        else if (item.type === 'select') return this.getSelectForm(item);
        else if (item.type === 'date') return this.getDateForm(item);
    }
}