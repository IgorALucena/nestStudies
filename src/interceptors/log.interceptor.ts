import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { Observable, tap } from "rxjs";

export class LogInterceptor implements NestInterceptor{

    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any>{
        
        const dt = Date.now();
        
        return next.handle().pipe(tap(()=>{ // após a execução de um ato, faça...
            
            const request = context.switchToHttp().getRequest();

            console.log(`URL: ${request.url}`);
            console.log(`Execução levou ${Date.now() - dt} milissegundos`)
        }))
    }
}