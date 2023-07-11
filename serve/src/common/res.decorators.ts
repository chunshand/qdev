import { ResultData } from './result';
import { Type, applyDecorators } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, ApiOkResponse, getSchemaPath, } from '@nestjs/swagger'
import { PageDto } from './page.dto';
import { DECORATORS } from "@nestjs/swagger/dist/constants"

const baseTypeNames = ['String', 'Number', 'Boolean']
/**
 * 
 * @param data 返回data模型
 * @returns 
 */
export const ResDecorators = <TModel extends Type<any>>(data?: TModel) => {

    const ExtraResultData = ApiExtraModels(ResultData, data);

    let items = null
    if (data && baseTypeNames.includes(data.name)) {
        items = { type: data.name.toLocaleLowerCase() }
    } else {
        items = { $ref: getSchemaPath(data) }
    }
    let prop = null
    if (data) {
        prop = items
    } else {
        prop = { type: 'null', default: null }
    }
    let m = Reflect.getOwnMetadata(DECORATORS.API_OPERATION, data)
    console.log("-----------------");
    console.log(m);
    console.log(data);
    console.log("-----------------");

    return applyDecorators(
        ExtraResultData,
        ApiOkResponse({
            schema: {
                allOf: [
                    { $ref: getSchemaPath(ResultData) },
                    {
                        properties: {
                            data: prop,
                        }
                    }
                ]
            }
        }))
}


