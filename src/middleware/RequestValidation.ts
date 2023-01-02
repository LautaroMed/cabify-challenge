import {Injectable, NestMiddleware} from "@nestjs/common";
import {NextFunction, Request, Response} from "express";
import {StatusCodes} from "http-status-codes";

@Injectable()
export class RequestValidation implements NestMiddleware {
    private allowedMethodsForEndpoints = {
        "status": "GET",
        "cars": "PUT",
        "journey": "POST",
        "dropoff": "POST",
        "locate": "POST"
    }

    private allowedContentTypeForEndpoints = {
        "status": undefined,
        "cars": "application/json",
        "journey": "application/json",
        "dropoff": "application/x-www-form-urlencoded",
        "locate": "application/x-www-form-urlencoded"
    }

    use(req: Request, res: Response, next: NextFunction) {
        const base = req.baseUrl.replace(/\//, "");
        const contentType = req.get('content-type');
        const method = req.method;

        if (method != this.allowedMethodsForEndpoints[base]) {
            res.sendStatus(StatusCodes.METHOD_NOT_ALLOWED);
            return;
        }

        if (contentType != this.allowedContentTypeForEndpoints[base]) {
            res.sendStatus(StatusCodes.BAD_REQUEST);
            return;
        }

        next();
    }
}