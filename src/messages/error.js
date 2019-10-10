export default {
    ruleNotFound: ruleName => new Error(`¡ERROR! La regla "${ruleName}" no existe.`),
    formMgsAttrNotFound: new Error('No se encuentra el elemento de HTML con el atributo data-form-message'),
    msgNotFound: ruleName => new Error(`¡ERROR! No existe mensaje de error para la regla "${ruleName}".`),
    inputNotFound: name => new Error(`¡ERROR! No existe el input con el name "${name}".`),
};
